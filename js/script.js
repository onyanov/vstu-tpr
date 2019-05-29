var app = {
    e1: {
        f1: 0,
        f2: 0,
        f3: 0
    },
    e2: {
        f1: 0,
        f2: 0,
        f3: 0
    },
    e3: {
        f1: 0,
        f2: 0,
        f3: 0
    },
    q1: 0,
    q2: 0,
    q3: 0,
    calculate: function() {
        app.parseInput();

        app.calculateBayes();
        app.calculateSevidge();
        

        $('#result').show();
        
    },

    parseInput: function() {
        app.e1.f1 = app.getValue('e1f1');
        app.e1.f2 = app.getValue('e1f2');
        app.e1.f3 = app.getValue('e1f3');
        
        app.e2.f1 = app.getValue('e2f1');
        app.e2.f2 = app.getValue('e2f2');
        app.e2.f3 = app.getValue('e2f3');

        app.e3.f1 = app.getValue('e3f1');
        app.e3.f2 = app.getValue('e3f2');
        app.e3.f3 = app.getValue('e3f3');

        app.q1 = app.getValue('q1');
        app.q2 = app.getValue('q2');
        app.q3 = app.getValue('q3');
    },
    
    getValue: function(id) {
        var parsed = parseFloat($('#'+id).val());
        if (isNaN(parsed)) {
            return 0;
        }
        return parsed;
    },

    calculateBayes: function() {
        //Байеса-Лапласа

        var p11 = 1.0 * app.e1.f1 * app.q1;
        var p12 = 1.0 * app.e1.f2 * app.q2;
        var p13 = 1.0 * app.e1.f3 * app.q3;
        var p1 = p11 + p12 + p13;
        

        var p21 = 1.0 * app.e2.f1 * app.q1;
        var p22 = 1.0 * app.e2.f2 * app.q2;
        var p23 = 1.0 * app.e2.f3 * app.q3;
        var p2 = p21 + p22 + p23;
        

        var p31 = 1.0 * app.e3.f1 * app.q1;
        var p32 = 1.0 * app.e3.f2 * app.q2;
        var p33 = 1.0 * app.e3.f3 * app.q3;
        var p3 = p31 + p32 + p33;

        b1 = Math.round(p1*100)/100;
        b2 = Math.round(p2*100)/100;
        b3 = Math.round(p3*100)/100;

        $('#a1p1').text(Math.round(p11*100)/100);
        $('#a1p2').text(Math.round(p12*100)/100);
        $('#a1p3').text(Math.round(p13*100)/100);
        $('#a1p0').text(b1);

        $('#a2p1').text(Math.round(p21*100)/100);
        $('#a2p2').text(Math.round(p22*100)/100);
        $('#a2p3').text(Math.round(p23*100)/100);
        $('#a2p0').text(b2);
        
        $('#a3p1').text(Math.round(p31*100)/100);
        $('#a3p2').text(Math.round(p32*100)/100);
        $('#a3p3').text(Math.round(p33*100)/100);
        $('#a3p0').text(b3);

        $('#p1').text(app.q1);
        $('#p2').text(app.q2);
        $('#p3').text(app.q3);

        var bMax = Math.max(b1,b2,b3);

        $('p#bayesSummary').text('Выбираем из ('+b1+'; '+b2+'; '+b3+') максимальный элемент max='+bMax);

        var strat = 0;
        if (b1 == bMax) {
            strat = 1;
        } else if (b2 == bMax) {
            strat = 2;
        } else if (b3 == bMax) {
            strat = 3;
        }
        $('#bayesId').text(strat);
    },

    calculateSevidge: function() {
        var maxR1 = Math.max(app.e1.f1, app.e2.f1, app.e3.f1);
        var maxR2 = Math.max(app.e1.f2, app.e2.f2, app.e3.f2);
        var maxR3 = Math.max(app.e1.f3, app.e2.f3, app.e3.f3);

        var r11 = maxR1 - app.e1.f1;
        var r12 = maxR2 - app.e1.f2;
        var r13 = maxR3 - app.e1.f3;
        var r1m = Math.max(r11, r12, r13);

        var r21 = maxR1 - app.e2.f1;
        var r22 = maxR2 - app.e2.f2;
        var r23 = maxR3 - app.e2.f3;
        var r2m = Math.max(r21, r22, r23);

        var r31 = maxR1 - app.e3.f1;
        var r32 = maxR2 - app.e3.f2;
        var r33 = maxR3 - app.e3.f3;
        var r3m = Math.max(r31, r32, r33);
        
        
        $('#a1r1').text(r11);
        $('#a1r2').text(r12);
        $('#a1r3').text(r13);
        $('#a1r0').text(r1m);

        $('#a2r1').text(r21);
        $('#a2r2').text(r22);
        $('#a2r3').text(r23);
        $('#a2r0').text(r2m);

        $('#a3r1').text(r31);
        $('#a3r2').text(r32);
        $('#a3r3').text(r33);
        $('#a3r0').text(r3m);        

        var sMin = Math.min(r1m,r2m,r3m);

        $('p#sevidgeSummary').text('Выбираем из ('+r1m+'; '+r2m+'; '+r3m+') минимальный элемент min='+sMin);

        var strat = 0;
        if (r1m == sMin) {
            strat = 1;
        } else if (r2m == sMin) {
            strat = 2;
        } else if (r3m == sMin) {
            strat = 3;
        }
        $('#sevId').text(strat);
    }

};


$(document).ready(function(){

    $('#inputData button').click(function() {
        app.calculate();
    });
});
