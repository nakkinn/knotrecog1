function setup(){
    createCanvas(windowWidth, windowHeight);

    function matome(){

    let code = [10, 6, 12, 14, 16, 2, 4, 8];
    let code2 = new Array(code.length*2+1);

    let cn = code.length;
    let cn2 = cn*2;

    let lista = [];
    let listb = [];
    let tmp;

    let endflag = false;

    for(let i=0; i<code.length; i++){
        code2[code[i]] = i*2+1;
        code2[i*2+1] = code[i];
    }

    //バイゴンを探す
    for(let i=1; i<=code2.length; i++){
        if(code2[cycle(i,1)]==cycle(code2[i],1)){
            lista = [i, code2[i], code2[cycle(i,1)], cycle(i,1)];
            listb = [-1,-1,1,1];
            break;
        }
        if(code2[cycle(i,-1)]==cycle(code2[i],-1)){
            lista = [i, code2[i],code2[cycle(i,1)], cycle(i,1)];
            listb = [1,-1,1,-1];
            break;
        }
    }

    //左
    for(let k=0; k<cn2; k++){
        if(cycle(lista[0],listb[0])==lista[3]){
            endflag = true;
            break;
        }
        if(code2[cycle(lista[0],listb[0])]==cycle(lista[1],listb[1])){
            tmp = lista[0];
            lista[0] = cycle(lista[1],listb[1]);
            lista[1] = cycle(tmp,listb[0]);
            tmp = listb[0];
            listb[0] = listb[1];
            listb[1] = tmp;
        }else{
            break;
        }
    }

    //右
    for(let k=0; k<cn2; k++){
        if(cycle(lista[0],listb[0])==lista[3]){
            endflag = true;
            break;
        }
        if(code2[cycle(lista[2],listb[2])]==cycle(lista[3],listb[3])){
            tmp = lista[2];
            lista[2] = cycle(lista[3],listb[3]);
            lista[3] = cycle(tmp,listb[2]);
            tmp = listb[2];
            listb[2] = listb[3];
            listb[3] = tmp;
        }else{
            break;
        }
    }

    //上
    for(let k=0; k<cn2; k++){
        if(cycle(lista[0],listb[0])==lista[1]){
            endflag = true;
            break;
        }
        if(code2[cycle(lista[1],listb[1])]==cycle(lista[2],listb[2])){
            tmp = lista[1];
            lista[1] = cycle(lista[2],listb[2]);
            lista[2] = cycle(tmp,listb[1]);
            tmp = listb[1];
            listb[1] = listb[2];
            listb[2] = tmp;
        }else{
            break;
        }
    }

    //下
    for(let k=0; k<cn2; k++){
        if(code2[cycle(lista[0],listb[0])]==cycle(lista[3],listb[3])){
            tmp = lista[0];
            lista[0] = cycle(lista[3],listb[3]);
            lista[3] = cycle(tmp,listb[0]);
            tmp = listb[0];
            listb[0] = listb[3];
            listb[3] = tmp;
        }else{
            break;
        }
    }



    console.log(code2);
    console.log(lista);
    console.log(listb);


    function cycle(a1, a2){
        let result = a1 + a2;
        if(result==0)   result = cn2;
        if(result==cn2+1)   result = 1;
        return result;
    }

    }

    let code = [10, 32, 28, 30, 2, 44, 26, 42, 38, 40, 36, 34, 14, 8, 6, 4, 24, 22, 16, 18, 20, 12];
    let code2 = new Array(code.length*2+1);
    let cn = code.length;
    let cn2 = cn*2;

    for(let i=0; i<cn; i++){
        code2[i*2+1] = code[i];
        code2[code[i]] = i*2+1;
    }

    let used = new Array(cn2+1);

    let lista = [];
    let tmp;

    for(let i=1; i<=cn2; i++){
        if(used[i]!=1){
            tmp = [[i, code2[i], i, code2[i]], [-1, -1, 1, 1]];
            
            used[i] = 1;
            used[code2[i]] = 1;

            if(code2[cycle(tmp[0][0],tmp[1][0])]==cycle(tmp[0][1],tmp[1][1]) || code2[cycle(tmp[0][2],tmp[1][2])]==cycle(tmp[0][3],tmp[1][3])){
                nejiri(tmp,0,1);
                nejiri(tmp,2,3);
            }else{
                nejiri(tmp,1,2);
                nejiri(tmp,3,0);
            }

            lista.push(tmp);
        }
    }

    function cycle(a1, a2){
        let result = a1 + a2;
        if(result==0)   result = cn2;
        if(result==cn2+1)   result = 1;
        return result;
    }

    function nejiri(arg, n1, n2){

        let tmp1;

        for(let k=0; k<cn2; k++){

            if(code2[cycle(arg[0][n1],arg[1][n1])]==cycle(arg[0][n2],arg[1][n2])){

                used[cycle(arg[0][n1],arg[1][n1])] = 1;
                used[code2[cycle(arg[0][n1],arg[1][n1])]] = 1;

                tmp1 = arg[0][n1];
                arg[0][n1] = cycle(arg[0][n2],arg[1][n2]);
                arg[0][n2] = cycle(tmp1, arg[1][n1]);
                tmp1 = arg[1][n1];
                arg[1][n1] = arg[1][n2];
                arg[1][n2] = tmp1;
                
            }else{
                break;
            }

        }
    }


    console.log(code2);

    console.log(lista);

}