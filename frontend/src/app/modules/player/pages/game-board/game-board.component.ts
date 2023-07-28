import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { Observable, Observer, Subscription } from 'rxjs';
import { IScore, ITournamentDetails } from 'src/app/core/models/gameboard';
import { LeaderboardService } from 'src/app/core/services/admin/leaderboard/leaderboard.service';
import { GameBoardService } from 'src/app/core/services/player/game-board/game-board.service';
import { ScoreComponent } from './dialogs/score/score.component';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {
  wordControlArray !: FormArray;
  tournamentId: string = '';
  tournament !: ITournamentDetails;
  keyBoardCharacters = "qwertyuiopasdfghjklzxcvbnm";
  gameStarted: boolean = false;
  currentWord !: string;
  currentHint !: string;
  currentWordIndex: number = 0;
  lettersRegistry: {
    [key: string]: number[]
  } = {

    }
  time: number = 0;

  numberOfAttempts: number = 6;
  timer !: Subscription;
  totalScore: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private gameBoardService: GameBoardService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {
    this.tournamentId = activatedRoute.snapshot.params['tournamentId'];
    this.wordControlArray = formBuilder.array([])
  }

  ngOnInit(): void {
    this.getTournamentDetails();
  }

  getTournamentDetails() {
    this.gameBoardService.getTournamentDetails(this.tournamentId).subscribe({
      next: (response: ITournamentDetails) => {
        this.tournament = response;
      }
    })
  }

  renderFormControls() {
    this.wordControlArray = this.formBuilder.array([]);
    this.lettersRegistry = {};
    this.currentWord.split('').forEach((L, i) => {
      const control = new FormControl('', [Validators.required]);
      this.wordControlArray.controls.push(control);
      this.wordControlArray.updateValueAndValidity();
      if (!this.lettersRegistry[L]?.length)
        this.lettersRegistry[L] = [i];
      else
        this.lettersRegistry[L].push(i);
    });
    this.wordValidityMonitor();
  }

  checkAnswer(key: string) {
    console.log(this.lettersRegistry)
    if (this.lettersRegistry[key]?.length) {
      this.fillControls(key, this.lettersRegistry[key])
    } else {
      this.numberOfAttempts--;
      if(this.numberOfAttempts===0) {
        this.onNextQuestion();
      }
    }
  }

  wordValidityMonitor() {
    this.wordControlArray.statusChanges.subscribe({
      next: () => {
        if (this.wordControlArray.valid) {
          this.onNextQuestion();
        }
      }
    })
  }

  fillControls(value: string, indexArray: number[]) {
    if (!this.wordControlArray.valid && this.wordControlArray.controls.length) {
      indexArray.forEach(I => {
        this.wordControlArray.controls[I].patchValue(value);
        this.wordControlArray.updateValueAndValidity();
      })
    }
  }

  manageGameFlow() {
    this.currentWord = this.tournament?.words[this.currentWordIndex].word.toLowerCase();
    this.currentHint = this.tournament?.words[this.currentWordIndex].hint;
    this.renderFormControls();

  }

  onNextQuestion() {
    this.calculateScore();
    this.stopTimer();
    this.currentWordIndex++;
    this.numberOfAttempts = 6;
    this.startTimer();
    if (this.tournament.words.length - 1 < this.currentWordIndex) {
      this.stopTimer();
      this.submitScore();
    } else {
      this.manageGameFlow();
    }
  }

  calculateScore() {
    console.log(this.wordControlArray.value)
    this.totalScore = Math.round(this.numberOfAttempts * 1000  * this.wordControlArray.value.filter((V : any)=>V).length / this.time);
  }

  submitScore() {
    this.dialog.open(ScoreComponent, {
      data: {
        totalScore: this.totalScore
      }
    }).afterClosed().subscribe({
      next: () => {
        const payload: IScore = {
          playerId: this.authService.getUserDetails()?.player?.playerId as string || '',
          tournamentId: this.tournamentId,
          categoryId: this.tournament.tournamentCategory.categoryId,
          score: this.totalScore
        }

        this.gameBoardService.submitScore(payload).subscribe({
          next : ()=>{
            this.goBack();
          }
        })

      }
    })
  }

  startTimer() {
    this.timer = new Observable<number>((observer) => {
      const intervalId = setInterval(() => {
        this.time++;
        if (this.time === 120) {
          this.onNextQuestion();
        } else
          observer.next(this.time);
      }, 1000);
      return () => {
        clearInterval(intervalId);
      };
    }).subscribe();
  }

  stopTimer() {
    this.time = 0;
    this.timer.unsubscribe();
  }

  resetTimer() {
    this.time = 0;
  }

  startGame() {
    this.gameStarted = true;
    this.startTimer();
    this.manageGameFlow();
  }

  goBack() {
    if(this.gameStarted) {
      this.onNextQuestion();
    }
    this.router.navigate(['player/tournaments']);
  }

}
