const { expect, assert } = require('chai');
const Colour = require('../src/views/js/color.class');

describe('test case for colour class init', ()=>{
    before(function(){
        cp = new Colour(0,0,0);
    })
    
    it('should be an object', ()=>{
        expect(cp).to.be.a('object');
    });

    it('alpha should be 1', ()=>{
        expect(cp.alpha).to.be.equal(1);
    });

    it('r,g,b should be set true', ()=>{
        expect(cp.setColor(0,0,0)).to.be.equal(true);
    });

    it('r should be 0', ()=>{
        expect(cp.red).to.be.equal(0);
    }); 
    
    it('g should be 0', ()=>{
        expect(cp.green).to.be.equal(0);
    });  

    it('b should be 0', ()=>{
        expect(cp.blue).to.be.equal(0);
    });  

    it('r,g,b should be [0,0,0]', ()=>{
        expect(cp.rgb).to.eql([0,0,0]);
    }); 
    
    it('r,g,b,a should be [0,0,0,1]', ()=>{
        expect(cp.rgba).to.eql([0,0,0,1]);
    });
});

describe('test rgb functions', ()=>{
    let c;
    before(function(){
        cp = new Colour(100,100,100);
    })
    
    //set alpha
    it('alpha should be 0.5', ()=>{
        cp.setAlpha(0.5);
        expect(cp.alpha).to.be.equal(0.5);
    });

    //set colour from rbg
    it('r,g,b should be set true', ()=>{
        expect(cp.setColorFromRGB([0,30,80])).to.be.equal(true);
    }); 

    it('r,g,b should be [0,30,80]', ()=>{
        expect(cp.rgb).to.eql([0,30,80]);
    }); 
    
    it('r,g,b,a should be [0,30,80,0.5]', ()=>{
        expect(cp.rgba).to.eql([0,30,80,0.5]);
    });

    //set colour from hex
    it('r,g,b from hex should be set true', ()=>{
        expect(cp.setColorFromHex('#91312a')).to.be.equal(true);
    }); 

    it('r,g,b from hexConverter should be [145,49,42]', ()=>{
        expect(cp.getRGBFromHex('#91312a')).to.eql([145,49,42]);
    });

    it('r,g,b from hex should be [145,49,42]', ()=>{
        cp.setColorFromHex('#91312a')
        expect(cp.rgb).to.eql([145,49,42]);
    }); 

    it('r,g,b,a from hexConverter should be [145,49,42,0.5]', ()=>{
        expect(cp.getRGBAFromHex('#91312a')).to.eql([145,49,42,0.5]);
    });
    
    //set colour from hsl
    it('r,g,b from hsl should be set true', ()=>{
        expect(cp.setColorFromHSL([150,49,33])).to.be.equal(true);
    }); 

    it('r,g,b from hsl should be [43,125,84]', ()=>{ 
        cp.setColorFromHSL([150,49,33])
        expect(cp.rgb).to.eql([43,125,84]);
    }); 

    it('r,g,b from hsl should be [43,125,84]', ()=>{ 
        expect(cp.getRGBFromHSL([150,49,33])).to.eql([43,125,84]);
    }); 

    //get css from rgb and rgba
    it('css ahould be rgb(10,20,30)', ()=>{
        expect(cp.getCSSFromRGB([10,20,30])).to.be.equal('rgb(10, 20, 30)');
    }); 

    it('css ahould be rgba(10,20,30, 0.80)', ()=>{
        expect(cp.getCSSFromRGBA([10,20,30,0.802])).to.be.equal('rgba(10, 20, 30, 0.80)');
    }); 

    //rgb -> rgba and vise versa
    it('r,g,b,a from rgb should be [150,49,33, 0.5]', ()=>{
        expect(cp.getRGBAFromRGB([150,49,33])).to.eql([150, 49, 33, 0.5]);
    }); 

    it('r,g,b from rgba should be [150,49,33]', ()=>{
        expect(cp.getRGBFromRGBA([150,49,33,0.75])).to.eql([150, 49, 33]);
    });
    
    // rgb from HSV
    //different test cases to test different h values
    const tests = [
        {"hsv": [120, 71, 80], "rgb": [59, 204, 59]},
        // could be rounding error [expected 59,204,61 got 59,204,62]
        {"hsv": [121, 71, 80], "rgb": [59, 204, 61]}, 
        {"hsv": [122, 71, 80], "rgb": [59, 204, 64]},
        {"hsv": [123, 71, 80], "rgb": [59, 204, 66]},
        {"hsv": [124, 71, 80], "rgb": [59, 204, 69]},
        {"hsv": [125, 71, 80], "rgb": [59, 204, 71]},
    ];
    tests.forEach(t => {
        it(`r,g,b from rgba should be ${t.rgb}`, ()=>{ 
            expect(cp.getRGBFromHSV(t.hsv)).to.eql(t.rgb);
        });
    });
});

describe('test case for converting to hex', ()=>{
    before(function(){
        cp = new Colour(0,0,0);
    });
    
    it('hex from rgb should be #054eb4', ()=>{
        expect(cp.getHexFromRGB([5, 78, 180])).to.be.equal('#054EB4');
    });  

    it('hex from hsl should be #c40e44 ', ()=>{
        expect(cp.getHexFromHSL([342,87,41])).to.be.equal('#C40E44');
    });

});

describe('test case for converting to hsl', ()=>{
    before(function(){
        cp = new Colour(0,0,0);
    });

    it('hsl from hex should be [151,51,63]', ()=>{
        expect(cp.getHSLFromHex('#71d1a3')).to.eql([151,51,63]);
    }); 
    
    it('hsl from rgb should be [57,77,48]', ()=>{
        expect(cp.getHSLFromRGB([217,207,28])).to.eql([57,77,48]);
    });
});

describe('test case for converting to hsv', ()=>{
    before(function(){
        cp = new Colour(0,0,0);
    });

    it('hsv from rgb should be [34,87,75]', ()=>{
        expect(cp.getHSVFromRGB([191,119,25])).to.eql([34,87,75]);
    }); 
    
});

describe('test case for dark & negative functions', ()=>{
    beforeEach(function(){
        cp = new Colour(0,0,0);
    });
    
    //test isDarkColor
    it('rgb should be dark (true)', ()=>{
        expect(cp.isDarkColor([46, 61, 47])).to.be.true;
    });

    it('rgb shouldnt be dark (false)', ()=>{
        expect(cp.isDarkColor([87, 186, 147])).to.be.false;
    });

    it('set colour shouldnt be dark (true)', ()=>{
        expect(cp.isDarkColor()).to.be.true;
    });

    it('set colour shouldnt be dark (true)', ()=>{
        cp.setColor(255,255,255)
        expect(cp.isDarkColor()).to.be.false;
    });

    //test negatives
    it('rgb negative should be [155,105,55]', ()=>{
        expect(cp.getNegativeColor([100,150,200])).to.be.eql([155,105,55]);
    }); 

    it('rgb negative should be [155,105,55]', ()=>{
        expect(cp.setNegativeColor([100,150,200])).to.be.eql([155,105,55]);
    });

    it('rgb negative should be [255,255,255]', ()=>{
        expect(cp.setNegativeColor()).to.be.eql([255,255,255]);
    });
});

describe('test case for complementary & greyscale functions', ()=>{
    beforeEach(function(){
        cp = new Colour(155,150,160);
    });
    
    //test red complementary
    it('red complementary should be [28, 170, 67]', ()=>{
        expect(cp.getRedComplementary([28, 67, 170])).to.be.eql([28, 170, 67]);
    });

    it('red complementary should be [155,160,150]', ()=>{
        expect(cp.getRedComplementary()).to.be.eql([155,160,150]);
    });

    it('rgb of red complementary should be [28, 170, 67]', ()=>{
        cp.setRedComplementary([28, 67, 170]);
        expect(cp.rgb).to.be.eql([28, 170, 67]);
    });

    it('rgb of red complementary should be [155,160,150]', ()=>{
        cp.setRedComplementary();
        expect(cp.rgb).to.be.eql([155,160,150]);
    });

    //test green complementary
    it('green complementary should be [170, 67, 28]', ()=>{
        expect(cp.getGreenComplementary([28, 67, 170])).to.be.eql([170, 67, 28]);
    });

    it('green complementary should be [160,150,155]', ()=>{
        expect(cp.getGreenComplementary()).to.be.eql([160,150,155]);
    });

    it('rgb of green complementary should be [28, 170, 67]', ()=>{
        cp.setGreenComplementary([28, 67, 170]);
        expect(cp.rgb).to.be.eql([170, 67, 28]);
    });

    it('rgb of green complementary should be [160,150,155]', ()=>{
        cp.setGreenComplementary();
        expect(cp.rgb).to.be.eql([160,150,155]);
    });

    //test blue complementary
    it('blue complementary should be [67, 28, 170]', ()=>{
        expect(cp.getBlueComplementary([28, 67, 170])).to.be.eql([67, 28, 170]);
    });

    it('blue complementary should be [150,155,160]', ()=>{
        expect(cp.getBlueComplementary()).to.be.eql([150,155,160]);
    });

    it('rgb of blue complementary should be [67, 28, 170]', ()=>{
        cp.setBlueComplementary([28, 67, 170]);
        expect(cp.rgb).to.be.eql([67, 28, 170]);
    });

    it('rgb of blue complementary should be [150,155,160]', ()=>{
        cp.setBlueComplementary();
        expect(cp.rgb).to.be.eql([150,155,160]);
    });

    //test greyscale
    it('greyscale should be [175, 175, 175]', ()=>{
        expect(cp.getGrayscale([130, 200, 170])).to.be.eql([175, 175, 175]);
    });

    it('greyscale should be [175, 175, 175]', ()=>{
        expect(cp.setGrayscale([130, 200, 170])).to.be.eql([175, 175, 175]);
    });
});

describe('test case for lightness functions', ()=>{
    beforeEach(function(){
        cp = new Colour(155,150,160);
    });
    
    //test hsl lightness
    it('lightness from HSL to rgb should be [87, 29, 175]', ()=>{
        expect(cp.getLightnessFromHSL(28,[264, 72, 12])).to.be.eql([87, 29, 175]);
    });

    it('lightness from HSL should be [264, 72, 40]', ()=>{
        cp.setLightnessFromHSL(28,[264, 72, 12]);
        expect(cp.hsl).to.be.eql([264, 72, 40]);
    });

    //rgb lightness
    it('lightness from hex should be [102, 255, 204]', ()=>{
        expect(cp.getLightnessFromRGB(15,[25, 255, 180])).to.be.eql([102, 255, 204]);
    });

    it('lightness of rgb should be [102, 255, 204]', ()=>{
        cp.setLightnessFromRGB(15,[25, 255, 180]);
        expect(cp.rgb).to.be.eql([102, 255, 204]);
    });

    //hex lightness
    it('lightness from hex should be #581FAD', ()=>{
        expect(cp.getLightnessFromHex(28,'#1a0934')).to.be.equal('#581FAD');
    });

    it('lightness of hex should be [155,160,150]', ()=>{
        cp.setLightnessFromHex(28,'#1a0934');
        expect(cp.hex).to.be.equal('#581FAD');
    });
});

describe('test case for hue change functions', ()=>{
    beforeEach(function(){
        cp = new Colour(155,150,160);
    });
    
    //test hsl hue
    it('hue from HSL to rgb should be [350, 29, 75]', ()=>{
        expect(cp.getChangeHueFromHSL(10,[-20, 29, 75])).to.be.eql([210, 173, 179]);
    });

    it('hue from HSL to rgb should be [210, 179, 173]', ()=>{
        expect(cp.getChangeHueFromHSL(10,[360, 29, 75])).to.be.eql([210, 179, 173]);
    });

    it('hue from HSL to rgb should be [210, 173, 173]', ()=>{ 
        expect(cp.getChangeHueFromHSL(10,[720, 29, 75])).to.be.eql([210, 179, 173]);
    });

    it('hue from hsl should be [175, 29, 75]', ()=>{ //not sure whats wrong here
        cp.setChangeHueFromHSL(10,[165, 29, 75]);
        expect(cp.hsl).to.be.eql([175, 29, 75]);
    });

    //rgb hue
    it('hue from rgb should be [191, 120, 132]', ()=>{
        expect(cp.getChangeHueFromRGB(-10,[191, 120, 120])).to.be.eql([191, 120, 132]);
    });

    it('hue from rgb should be [189, 82, 76]', ()=>{
        expect(cp.getChangeHueFromRGB(10,[189, 77, 90])).to.be.eql([189, 82, 76]);
    });

    it('hue from rgb should be [10, 29, 175]', ()=>{
        cp.setChangeHueFromRGB(20,[120, 191, 191]);
        expect(cp.rgb).to.be.eql([120, 167, 191]);
    });

    //hex lightness
    it('hue from hex should be #BF7884', ()=>{
        expect(cp.getChangeHueFromHex(-10,'#bf7878')).to.be.equal('#BF7884');
    });

    it('hue from hex should be #bd524c', ()=>{
        expect(cp.getChangeHueFromHex(10,'#bd4d5a')).to.be.equal('#BD524C');
    });

    it('hue from hex should be #78a7bf', ()=>{
        cp.setChangeHueFromHex(20,'#78BFBF');
        expect(cp.hex).to.be.equal('#78A7BF');
    });

    // natural from rgb
    // it('natural from rbg should be #bd524c', ()=>{
    //     expect(cp.getChangeHueFromHex(10,'#bd4d5a')).to.be.equal('#BD524C');
    // });
});