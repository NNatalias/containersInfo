import { Component, OnInit } from '@angular/core';
import {ContainerService} from '../container.service';
import {delay} from 'rxjs/operators';
import {ContainerMainInfo} from '../container-info.interface';

export class Container{
  constructor(public num: string)
  { }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(public containerService: ContainerService) { }
  container: Container = new Container('');
  errorText = '';
  value = false;
  allowSearch  = false;
  containerMainInfo: ContainerMainInfo;
  letterEquivalent = {
    A: 10, B: 12, C: 13, D: 14, E: 15, F: 16, G: 17, H: 18, I: 19, J: 20,
    K: 21, L: 23, M: 24, N: 25, O: 26, P: 27, Q: 28, R: 29, S: 30, T: 31,
    U: 32, V: 34, W: 35, X: 36, Y: 37, Z: 38
  };

  ngOnInit(): void {
  }
  validator(): any {
    this.allowSearch = false;
    let i = this.container.num.length - 1;
    this.container.num = this.container.num.replace(/\s/g, '');
    this.container.num = this.container.num.toUpperCase();
    const regex1 = new RegExp('[0-9]');
    const regex2 = new RegExp('[A-Z]');
    if (this.container.num.length === 0){
      this.allowSearch  = false;
      this.errorText = '';
    }
    for ( i ; i < this.container.num.length; i++) {
      if (this.container.num.length <= 4){
        if (regex1.test(this.container.num[i])) {
          this.container.num = this.container.num.slice(0, -1);
          this.errorText = 'Введен неверный символ. Введите букву латинского алфавита';
          this.allowSearch  = false;
      }else {this.errorText = ''; } }
      else if (this.container.num.length > 4 && this.container.num.length <= 11){
        if (regex2.test(this.container.num[i])) {
          this.container.num = this.container.num.slice(0, -1);
          this.errorText = 'Введен неверный символ. Введите цифру';
          this.allowSearch  = false;
        }else {this.errorText = ''; } }}
    if (this.container.num.length === 11){
      let arrayOfStrings = this.container.num.split('');
      arrayOfStrings = this.replaceLettersToNumbers(arrayOfStrings);
      let arr = arrayOfStrings.map(Number);
      const inputControlNum = arr.pop();
      arr = this.multipleDigit(arr);
      let sumOfNum = arr.reduce((s, v) => s + +v, 0);
      sumOfNum = sumOfNum % 11;
      if (inputControlNum === sumOfNum){
        this.allowSearch = true;
      }else {this.errorText = 'Контрольная сумма не совпадает, проверьте правильность введенного номера'; }
    }
  }
  multipleDigit(arr): any {
    const numberToBeMultiplied = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512];
    return arr.map(function nameOfFunction(n, i): any{
        return n * numberToBeMultiplied[i];
      });
  }
  replaceLettersToNumbers(array: string[]): any {
    for (let i = 0; i < 4; i++) {
      array[i] = this.letterEquivalent[array[i]];
    }
    return array;
  }
  searchContainer(): any {
    this.value = true;
    delay(6000);
    this.containerService.searchContainerInfo(this.container.num).subscribe((response: ContainerMainInfo) => {
      this.containerMainInfo = response;
      this.value = false;
    }); }
}

