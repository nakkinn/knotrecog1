//2977個全て認識できることを確認する

let img;
let index = 970;
let ready =  false;
let error = [];


function setup(){

    createCanvas(400, 400);

}


function draw(){

    if(ready){
        ready = false;

        main();

        index++;
        
        if(index<2977)   img = loadImage('diagrams_2977/' + knotinfo_name[index] + '.png', function(){ready=true});
        else    console.log(error);
    }

}


function main(){
    let pix_hoso, pix_niti, ikisaki, plist, crossinfo;

    pix_niti = nitika(img);
    pix_hoso = newhososenka(pix_niti);  
    
    let branches = checkBranch(pix_hoso);   
    if(branches[0]==1 && branches[1]==0){  
        pix_hoso = deleteBranch1(pix_hoso);
    }
    if(branches[0]==2 && branches[1]==0){
        pix_hoso = deleteBranch2(pix_hoso);
    }

    ikisaki = pairing(pix_hoso);

    plist = pix2plist(pix_hoso);
    plist = sortplist(plist, ikisaki);

    crossinfo = split2(plist);

    let code = cross2dowker(crossinfo, 0, false);

    let calcalex = dok2alex(code);
    let infoalex = knotinfo_alex[index];

    console.log(index);
    if(calcalex!=infoalex){
        console.log(knotinfo_name[index]);
        error.push(knotinfo_name[index]);
    }

}

function keyPressed(){
    if(keyCode==ENTER){
        img = loadImage('diagrams_2977/' + knotinfo_name[index] + '.png', function(){ready=true});
    }
}

/* 
12a_170(970), 12a_171(971)に失敗
*/