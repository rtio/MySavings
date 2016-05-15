import {Storage, SqlStorage} from 'ionic-angular';

export class ContasRepository {
  private _storage : any;
  
  constructor() {
    this._storage = new Storage(SqlStorage);        
    this._storage.query("CREATE TABLE IF NOT EXISTS contas(id INTEGER PRIMARY KEY AUTOINCREMENT, descricao TEXT)")
    .then((data) => {
      console.log("Tabela contas criada");
    }, (error) => {
      console.log("Erro na criação da tabela " + JSON.stringify(error.err));
    }); 
  }
  /**
   * getList
   */
  public getList(successCallBack: (value: any[]) => void): void{
    this._storage.query("SELECT * FROM contas").then((data) => {
      let lista: any[] = [];
      
      for (var i = 0; i < data.res.rows.length; i++) {
        let item: any = {};
        
        item.id = data.res.rows.item(i).id;
        item.descricao = data.res.rows.item(i).descricao;
        
        lista.push(item);
      }
      
      successCallBack(lista);
    }, (error) => {
      console.log("Erro ao retornar dados");
    });
  }
  /**
   * insert
   */
  public insert(value: any, successCallBack: (data: any) => void): void {
    this._storage.query("INSERT INTO contas(descricao) VALUES(?)", [value.descricao]).then((data) => {
      value.id = data.res.insertId;
      successCallBack(value);
      console.log("ID: " + JSON.stringify(value.id) + " VALUE: " + JSON.stringify(value.descricao));
    }, (error) => {
      console.log("Erro ao inserir valor");
    });
  }
  /**
   * edit
   */
  public edit(value : any, successCallBack: (data: any) => void) : void {
    this._storage.query("UPDATE contas SET descricao = ? WHERE id = ?", [value.descricao, value.id]).then((data) => {
      successCallBack(value);
      console.log("ID: " + JSON.stringify(value.id) + " VALUE: " + JSON.stringify(value.descricao));
    }, (error) => {
      console.log("Erro ao atualizar valor");
    });
  }
  /**
   * delete
   */
  public delete(value : any,  successCallBack: (data: any) => void) : void {
    this._storage.query("DELETE FROM contas WHERE id = ?", [value.id]).then((data) => {
      successCallBack(value);
      console.log("Deletado com sucesso");
    }, (error) => {
      console.log("Erro ao apagar valor");
    });
  }
}
