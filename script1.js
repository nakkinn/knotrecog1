let img;

let pix_hoso, pix_niti, ikisaki, plist, longlist;

let kname = '12a_355';//'11n_39'

function preload(){
    img = loadImage('diagrams_2977/' + kname + '.png');
}

function setup(){
    createCanvas(400, 400);

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
    
    rectMode(CENTER);

    noLoop();
    
}


function draw(){

    
    //描画
    //background(255);

    // noStroke();
    // for(let i=1; i<pix_hoso.length-1; i++)    for(let j=1; j<pix_hoso[0].length-1; j++){
    //     if(pix_hoso[i][j]==0)    fill(255);
    //     if(pix_hoso[i][j]==1)    fill(0);
    //     rect(i, j, 1);
    // }

    // stroke(0, 0, 255);
    // strokeWeight(3);
    // for(let i=0; i<12; i++){
    //     for(let j=0; j<plist[i].length-1; j++){
    //         line(plist[i][j][0], plist[i][j][1], plist[i][j+1][0], plist[i][j+1][1]);
    //     }
    // }

    detectCross(plist);

}


function keyPressed(){
    if(keyCode==ENTER)  saveCanvas(kname+'_thin','png');
}


