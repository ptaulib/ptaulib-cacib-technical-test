import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-language-switcher',
  standalone: false,
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.scss'
})
export class LanguageSwitcher implements OnInit {

ngOnInit() {
      console.log("begin ngOnInit LanguageSwitcher")
}


  constructor(private translate: TranslateService) {
  }



  useLanguage(language: string): void {
      this.translate.use(language);
  }

}
