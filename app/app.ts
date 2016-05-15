import {App, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from './pages/home/home';
import {ContasPage} from './pages/contas/contas';


@App({
  templateUrl: 'build/app.html',
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {
  private _rootPage: any
  private _homePage: any;
  private _contasPage: any;
  
  public get rootPage() : any {
    return this._rootPage;
  }
  
  public set rootPage(rootPage : any) {
    this._rootPage = rootPage;
  }
  
  public get homePage() : any {
    return this._homePage;
  }
  
  public set homePage(homePage : any) {
    this._homePage = homePage;
  }
  
  public get contasPage() : any {
    return this._contasPage;
  }
  
  public set contasPage(contasPage : any) {
    this._contasPage = contasPage;
  }
  
  constructor(platform: Platform) {
    this.homePage = HomePage;
    this.contasPage = ContasPage;
    this.rootPage = this.homePage; //Principal 
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
  
  public openPage(page : any) : void {
    this.rootPage = page;
  }
}
