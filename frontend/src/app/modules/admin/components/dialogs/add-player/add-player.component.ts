import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IAddUser } from 'src/app/core/models/admin.model';
import { CategoryService } from 'src/app/core/services/admin/category/category.service';
import { PlayerService } from 'src/app/core/services/admin/player/player.service';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss']
})
export class AddPlayerComponent implements OnInit {
  playerForm = new FormGroup({
    username : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required),
    confirmPassword : new FormControl('', Validators.required),
    about : new FormGroup({
      contact : new FormControl(),
      address : new FormControl()
    })
  })

  constructor(
    public dialogRef: MatDialogRef<AddPlayerComponent>,
    private playerService : PlayerService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.addConfirmPasswordValidity();
  }

  onSubmit() {
    if(this.playerForm.valid) {
        const playerFormValue = this.playerForm.value;
        const playerToAdd : IAddUser = {
          playerName : playerFormValue.username || '',
          username : playerFormValue.username || '',
          password : playerFormValue.password || '',
          about : (playerFormValue.about?.contact || playerFormValue.about?.address)? {
            contactNumber : playerFormValue.about.contact,
            address : playerFormValue.about.address
          } : null
        };
        this.playerService.addPlayer(playerToAdd).subscribe({
          next : (response? : any)=>{
            this.dialogRef.close();
            alert(response.message);
          }
        })
    }
  }

  addConfirmPasswordValidity() {
    this.playerForm.valueChanges.subscribe({
      next : (value)=>{
        if(value.password!==value.confirmPassword && (this.playerForm.get('confirmPassword')?.dirty)) {
            this.playerForm.get('confirmPassword')?.setErrors({
              notMatch : true
            })
        } else {
          this.playerForm.get('confirmPassword')?.setErrors(null)
        }
      }
    })
  }
}
