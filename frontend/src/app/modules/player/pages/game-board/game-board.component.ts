import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { ITournamentDetails } from 'src/app/core/models/gameboard';
import { LeaderboardService } from 'src/app/core/services/admin/leaderboard/leaderboard.service';
import { GameBoardService } from 'src/app/core/services/player/game-board/game-board.service';

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
  gameStarted: boolean = true;
  currentWord !: string;
  currentHint !: string;
  currentWordIndex : number = 0;
  lettersRegistry: {
    [key: string]: number[]
  } = {

    }

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private gameBoardService: GameBoardService,
    private formBuilder: FormBuilder
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
        this.manageGameFlow();
      }
    })
  }

  renderFormControls() {
    this.wordControlArray = this.formBuilder.array([])
    this.currentWord.split('').forEach((L, i) => {
      const control = new FormControl('', Validators.required);
      this.wordControlArray.controls.push(control);
      if (!this.lettersRegistry[L]?.length)
        this.lettersRegistry[L] = [i];
      else
        this.lettersRegistry[L].push(i);
    })
  }

  checkAnswer(key: string) {
    if (this.lettersRegistry[key]?.length) {
      this.fillControls(key, this.lettersRegistry[key])
    }
  }

  wordValidityMonitor() {
    this.wordControlArray.statusChanges.subscribe({
      next: () => {
        if (this.wordControlArray.valid) {
          //calculate score and proceed
        }
      }
    })
  }

  fillControls(value: string, indexArray: number[]) {
    if (!this.wordControlArray.valid && this.wordControlArray.controls.length) {
      indexArray.forEach(I => {
        this.wordControlArray.controls[I].patchValue(value);
      })
    }
  }

  manageGameFlow() {
    this.currentWord = this.tournament?.words[this.currentWordIndex].word;
    this.currentHint = this.tournament?.words[this.currentWordIndex].hint;
    this.renderFormControls();

  }

}
