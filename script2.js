//2977個のダイアグラムに対して最小のドーカーコードを探してマーキングする

let img;

let pix_hoso, pix_niti, ikisaki, plist, crossinfo;

let index = 0;    //0から248まで　10交点

let ready = false;

let error = [];


function setup(){
    createCanvas(400, 400);
    
    frameRate(1);

    rectMode(CENTER);

}


function draw(){

    
    if(ready){

        ready = false;

        main();

        index++;
        if(index<249)   img = loadImage('diagrams_2977/' + knotinfo_name[index] + '.png', function(){ready=true});

    }

}



function main(){
    pix_niti = nitika(img);
    pix_hoso = newhososenka(pix_niti);  
    
    let branches = checkBranch(pix_hoso);   //枝分かれの数を調べる
    if(branches[0]==1 && branches[1]==0){   //3つ又が1個だけのとき
        pix_hoso = deleteBranch1(pix_hoso);
    }
    if(branches[0]==2 && branches[1]==0){
        pix_hoso = deleteBranch2(pix_hoso);
    }

    ikisaki = pairing(pix_hoso);

    plist = pix2plist(pix_hoso);
    plist = sortplist(plist, ikisaki);

    //crossinfo = splitarc(plist);
    crossinfo = split2(plist);

    let mindowker = knotinfo_dtnotation[index];

    let lista = new Array(plist.length);
    let listb = new Array(plist.length);
    let listc = new Array(plist.length);
    let listd = new Array(plist.length);


    for(let i=0; i<crossinfo.length; i++){
        let tmp1, tmp2;
        tmp1 = crossinfo[i][0];
        tmp2 = crossinfo[i][1];
        lista[(tmp1+1)%plist.length] = true;
        lista[(tmp2+1)%plist.length] = false;
        listb[tmp1] = true;
        listb[tmp2] = false;
    }

    let code;
    let mode=0; //0:ない　1:元画像に存在　2：反転画像に存在

    for(let i=0; i<plist.length; i++){

        if(lista[i]){
            code = cross2dowker(crossinfo, i, false);

            let flag = true;    //true:一致
            for(let j=0; j<code.length; j++){
                if(code[j]!=mindowker[j]){
                    flag = false;
                    break;
                }
            }

            if(flag){
                mode = 1;
                listc[i] = true;
            }
        }

        if(listb[i]){

            code = cross2dowker(crossinfo, i, true);

            let flag = true;    //true:一致
            for(let j=0; j<code.length; j++){
                if(code[j]!=mindowker[j]){
                    flag = false;
                    break;
                }
            }

            if(flag){
                mode = 1;
                listd[i] = true;
            }

        }

    }

    if(mode==0){


        for(let i=0; i<plist.length; i++){

            if(!lista[i]){
                code = cross2dowker(crossinfo, i, false);
    
                let flag = true;    //true:一致
                for(let j=0; j<code.length; j++){
                    if(code[j]!=-mindowker[j]){
                        flag = false;
                        break;
                    }
                }
    
                if(flag){
                    mode = 2;
                    listc[i] = true;
                }
            }
    
            if(!listb[i]){
    
                code = cross2dowker(crossinfo, i, true);
    
                let flag = true;    //true:一致
                for(let j=0; j<code.length; j++){
                    if(code[j]!=-mindowker[j]){
                        flag = false;
                        break;
                    }
                }
    
                if(flag){
                    mode = 2;
                    listd[i] = true;
                }
    
            }
    
        }
        
    }

    background(255);

    if(mode==1){
        image(img, 0, 0);

        noStroke();
        fill(255, 0, 0);
        for(let i=0; i<listc.length; i++){
            if(listc[i])    circle(plist[i][0][0], plist[i][0][1], 7);
            if(listd[i])    circle(plist[i][plist[i].length-1][0], plist[i][plist[i].length-1][1], 7);
        }

        stroke(255);
        fill(0);
        textSize(16);
        text(mindowker, 20, 390);
    }

    if(mode==2){
        strokeWeight(3);
        stroke(0, 0, 255);
        for(let i=0; i<plist.length; i++){
            for(let j=0; j<plist[i].length-1; j++){
                line(plist[i][j][0], plist[i][j][1], plist[i][j+1][0], plist[i][j+1][1]);
            }
        }

        for(let i=0; i<crossinfo.length; i++){
            if(!crossinfo[i][2]) line(crossinfo[i][3].x, crossinfo[i][3].y, crossinfo[i][4].x, crossinfo[i][4].y);
            else    line(crossinfo[i][5].x, crossinfo[i][5].y, crossinfo[i][6].x, crossinfo[i][6].y);
        }

        strokeWeight(1);

        noStroke();
        fill(255, 0, 0);
        for(let i=0; i<listc.length; i++){
            if(listc[i])    circle(plist[i][0][0], plist[i][0][1], 7);
            if(listd[i])    circle(plist[i][plist[i].length-1][0], plist[i][plist[i].length-1][1], 7);
        }

        stroke(255);
        fill(0);
        textSize(16);
        text(mindowker, 20, 390);

    }

    if(mode!=0) saveCanvas(knotinfo_name[index]+'_mindt','png');
    else    error.push(index);

}


function keyPressed(){
    if(keyCode==ENTER){
        img = loadImage('diagrams_2977/' + knotinfo_name[index] + '.png', function(){ready=true});
    }
}

//kobopcより更新