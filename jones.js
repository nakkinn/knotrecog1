function setup(){

    let code = [4, 6, 2];
    let coder = dok2rise(code);

    let n2 = code.length*2;

    let pdata = [];

    //とりあえず交代結び目と仮定
    for(let i=0; i<code.length; i++){
        if(coder[i][1]==-1) pdata.push([slide(code[i],-1,n2), 2*i+1, code[i], slide(2*i+1,-1,n2)]);
        else    pdata.push([slide(code[i],-1,n2), slide(2*i+1,-1,n2), code[i], 2*i+1]);
    }

    console.log(pdata);

    function slide(a1, sign, n){
        let result = a1;
        if(sign==1){
            result++;
            if(result>n)    result = 1;
        }else{
            result--;
            if(result==0)   result = n;
        }
        return result;
    }

    let lista = [];

    for(let i=0; i<pdata.length; i++){
        lista[i] = ['A', 'B'];
        lista[i][0] += '[' + pdata[i][0] + ',' + pdata[i][3] + '],' + '[' + pdata[i][1] + ',' + pdata[i][2] + '],';
        lista[i][1] += '[' + pdata[i][0] + ',' + pdata[i][1] + '],' + '[' + pdata[i][2] + ',' + pdata[i][3] + '],';
    }

    console.log(lista);

    let listb = [];

    for(let i=0; i<2**pdata.length; i++){
        let dec = i.toString(2).padStart(pdata.length,'0');

        let tmp = '';
        
        for(let j=0; j<dec.length; j++){
            if(dec.charAt(j)=='0')    tmp += lista[j][0];
            else    tmp += lista[j][1];
        }

        listb.push(tmp);
    }

    let listc = new Array(listb.length);

    for(let i=0; i<listb.length; i++){

        let cou = 0;

        for(let j=0; j<listb[i].length; j++){
            if(listb[i].charAt(j)=='A') cou++;
            if(listb[i].charAt(j)=='B') cou--;
        }

        //A, Bを削除
        listb[i] = listb[i].split('A').join(''); 
        listb[i] = listb[i].split('B').join('');

        listb[i] = '[' + listb[i].slice(0,-1) + ']';    //最後の,を削除して[]で囲む

        listb[i] = JSON.parse(listb[i]);

        listc[i] = cou;
    }

    console.log(listb);

    for(let k0=0; k0<listb.length; k0++){

        listb[k0];

        for(let k1=0; k1<99999; k1++){

            for(let i=0; i<listb[k0].length; i++) listb[k0][i].sort(function(a,b){return a-b});
            listb[k0].sort(function(a,b){return a[0]-b[0]});

            for(let i=0; i<listb[k0].length-1; i++){
                if(listb[k0][i][0]==listb[k0][i+1][0]){
                    listb[k0][i] = [listb[k0][i][1], listb[k0][i+1][1]]
                    listb[k0].splice(i+1,1);
                }
            }

            let flag = true;
            for(let i=0; i<listb[k0].length; i++){
                if(listb[k0][i][0]!=listb[k0][i][1]){
                    flag = false;
                    break;
                }
            }

            if(flag)    break;

        }

    }

    for(let i=0; i<listc.length; i++){
        listc[i] = [listc[i], listb[i].length];
    }

    listc.sort(function(a,b){return a[0]-b[0]});
    
    for(let i=0; i<listc.length-1; i++){
        if(listc[i][0]==listc[i+1][0]){
            listc[i][1] += listc[i+1][1];
            listc.splice(i+1,1);
            i--;
        }
    }

    console.log(listc);
    


}