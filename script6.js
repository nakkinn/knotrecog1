//knotplistの読み込み

function setup(){
    createCanvas(windowWidth, windowHeight);

    let index = 100;

    const plist = diagramdata[index][1];
    let crossinfo = diagramdata[index][2];
    const cn = crossinfo.length;

    console.log(crossinfo);
    
    stroke(0, 0, 255);

    for(let i=0; i<plist.length; i++){
        for(let j=0; j<plist[i].length-1; j++){
            line(plist[i][j][0], plist[i][j][1], plist[i][j+1][0], plist[i][j+1][1]);
        }
    }

    for(let i=0; i<cn; i++){
        let arcn, p1;
        arcn = crossinfo[i][1]-1;
        p1 = plist[arcn][plist[arcn].length-1];
        circle(p1[0], p1[1], 5);
        arcn = crossinfo[i][1]%cn;
        p1 = plist[arcn][plist[arcn].length-1];
        circle(p1[0], p1[1], 5);
    }
}


//チェッカーボード
// function setup(){

//     let code = [12,8,10,2,16,14,18,6,4];

//     let fullcode = [];
//     for(let i=0; i<code.length; i++){
//         fullcode[code[i]] = i*2+1;
//         fullcode[i*2+1] = code[i];
//     }

//     let tmp = dok2rise(code);
//     let rise = [];
//     for(let i=0; i<tmp.length; i++)    rise[i*2+1] = tmp[i][1];
    

//     let lista = [];
//     for(let i=0; i<code.length; i++){
//         if(rise[i*2+1]==1){
//             lista[i*2+1] = [cycle(fullcode[i*2+1],-1,code.length*2), cycle(fullcode[i*2+1],1,code.length*2)];
//         }else{
//             lista[i*2+1] = [cycle(fullcode[i*2+1],1,code.length*2), cycle(fullcode[i*2+1],-1,code.length*2)];
//         }
//     }

//     let used = new Array(code.length*2);
//     for(let i=0; i<used.length; i++)    used[i] = [0,0];

//     let result = [];

//     for(let k=0; k<code.length; k++){
    
//         let flag = true;
//         let start;
//         let sw;

//         for(let i=0; i<code.length; i++)    for(let j=0; j<2; j++){
//             if(used[i*2+1][j]==0){
//                 start = i*2+1;
//                 sw = j;
//                 flag = false;
//             }
//         }

//         if(flag)    break;
        
//         let m = start;
//         let listb = [];

//         for(let i=0; i<code.length; i++){

//             listb.push(m);
//             used[m][sw] = 1;

//             tmp = m;
//             m = lista[m][sw];
//             if(rise[tmp]==1)    sw = (sw+1)%2;

//             if(m==start)    break;
//         }

//         result.push(listb);
    
//     }

//     console.log(result);


//     function cycle(a1, a2, n1){
//         let result;
//         result = (a1 + a2) % n1;
//         if(result==0)   result = n1;
//         return result;
//     }



// }