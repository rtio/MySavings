import {Page, Modal, NavController} from 'ionic-angular';
import {ContasRepository as Repository} from '../../repository/contas-repository';
import {ContasModalPage as ContasModal} from '../contas-modal/contas-modal';

@Page({
  templateUrl: 'build/pages/contas/contas.html'
})

export class ContasPage {
  private _repository : Repository;
  private _listContas : any[];
  private _nav : NavController;
  
  public get listContas() : any[] {
    return this._listContas;
  }
  
  public set listContas(listContas : any[]) {
    this._listContas = listContas;
  }
  
  constructor(nav : NavController) {
    this._repository = new Repository();
    this._repository.getList((lista) => {
      this.listContas = lista;
    }); 
    this._nav = nav;
  }
  
  public insert() : void {
    let modal = Modal.create(ContasModal);
    modal.onDismiss((data : any) => {
      this._repository.insert(data, (data) => {
        this._listContas.push(data);
      });
    });
    this._nav.present(modal);
  }
  
  public edit(conta : any) : void {
    let modal = Modal.create(ContasModal, {param: conta});
    modal.onDismiss((data : any) => {
      this._repository.edit(data, (data) => {
        
      });
    });
    this._nav.present(modal);
  }
  
  public delete(conta : any) : void {
    this._repository.delete(conta, (data) => {
      let pos: number = this._listContas.indexOf(conta);
      this._listContas.splice(pos, 1);
    });
  }
}
