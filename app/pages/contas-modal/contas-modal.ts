import {Page, ViewController, NavParams} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/contas-modal/contas-modal.html',
})
export class ContasModalPage {
  private _view : ViewController;
  private _conta : any;
  
  public get conta() : any {
    return this._conta;
  }
  
  public set conta(conta : any) {
    this._conta = conta;
  }
  
  constructor(view : ViewController, nav : NavParams) {
    this._view = view;
    this.conta = nav.get("param") || {descricao: ""};
  }
  
  public cancel() : void {
    this._view.dismiss();
  }

  public salvar() : void {
    this._view.dismiss(this.conta);
  }  
}
