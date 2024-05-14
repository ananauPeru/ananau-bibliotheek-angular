import { Component, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent {
  @Input() audioSource: string;
  @ViewChild('audioPlayer') audioPlayer: ElementRef;

  isPlaying = false;
  progress = 0;

  toggleAudio() {
    if (this.isPlaying) {
      this.audioPlayer.nativeElement.pause();
    } else {
      this.audioPlayer.nativeElement.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  onTimeUpdate() {
    const duration = this.audioPlayer.nativeElement.duration;
    const currentTime = this.audioPlayer.nativeElement.currentTime;
    this.progress = (currentTime / duration) * 100;
  }
}