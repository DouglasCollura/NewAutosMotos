import { Component, OnInit,AfterViewInit } from '@angular/core';
declare var $: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
    title = 'AutosMotos';

    lang=""
    Redirect(){

        console.log(this.lang)
        // if(this.lang == 'es|it'){
        //     location.href = 'https://autosmotos.it/';  
        // }
        
    }

    ngAfterViewInit() {
        
        let host:any = window.location.hostname.split('.')
        if(host[host.length-1] == 'en'){
            console.log($("#select-lang ").val('es|en'))
            $("#select-lang").trigger('change')
        }
        if(host[host.length-1] == 'de'){
            console.log($("#select-lang ").val('es|de'))
            $("#select-lang").trigger('change')
        }
        if(host[host.length-1] == 'it'){
            console.log($("#select-lang ").val('es|it'))
            $("#select-lang").trigger('change')
        }
        if(host[host.length-1] == 'ro'){
            console.log($("#select-lang ").val('es|ro'))
            $("#select-lang").trigger('change')
        }
        // $("#select-lang").change(()=>{
        //     this.lang =$("#select-lang option:selected").val()

        //     if(this.lang == 'es|ro'){
        //         location.href = 'http://autosmotos.ro.dattatech.com/';  
        //     }
            
        //     if(this.lang == 'es|en'){
        //         location.href = 'http://autosmotos.en.dattatech.com/';  
        //     }
        //     if(this.lang == 'es|it'){
        //         location.href = 'http://autosmotos.it.dattatech.com/';  
        //     }
        //     if(this.lang == 'es|es'){
        //         location.href = 'http://automotos.dattatech.com/';  
        //     }
        // })
    }

    ngOnInit(): void {
        sessionStorage.setItem('lang','es|es')
    }

}
