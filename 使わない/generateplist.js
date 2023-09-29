//diagrams_2977からポイントリストを取り出す

let ready = false;
let index = 0;

let filestr = [];

function setup(){
    createCanvas(400,400);
}

function draw(){

    if(ready){

        console.log(index);

        let pix_hoso, pix_niti, ikisaki, plist, crossinfo, branches, code;
        
        pix_niti = nitika(img);
        pix_hoso = newhososenka(pix_niti);

        
        branches = checkBranch(pix_hoso);   
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

        let newcrossinfo = new Array(crossinfo.length);
        for(let i=0; i<newcrossinfo.length; i++){
            newcrossinfo[i] = [
                crossinfo[i][0]+1,
                crossinfo[i][1]+1,
                round(crossinfo[i][7].x,2),
                round(crossinfo[i][7].y,2)
            ];
        }

        let tmp = [];

        for(let i=0; i<plist.length; i++){
            for(let j=0; j<plist[i].length; j++){
                for(let k=0; k<2; k++){
                    plist[i][j][k] = round(plist[i][j][k],2);
                }
            }
        }

        tmp.push(knotinfo_name[index]);
        tmp.push(plist)
        tmp.push(newcrossinfo);
        
        filestr.push(tmp);

        if(index<2977){
            index++;
            img = loadImage('diagrams_2977edit/' + knotinfo_name[index] + '.png', function(){ready = true;});
        }else{
            filestr = JSON.stringify(filestr);
            console.log(filestr);
        }
        
        ready = false;
    }

}

function keyPressed(){
    if(keyCode==ENTER){
        img = loadImage('diagrams_2977edit/' + knotinfo_name[index] + '.png', function(){ready = true;});
    }
}
