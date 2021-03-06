Array.prototype.remove = function (val) {
    const index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
        return val;
    }
    return null;
};

function CreateSVG(tag, attrs) {
    var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var k in attrs)
        el.setAttribute(k, attrs[k]);
    return el;
}

function compare(a, b) {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
    return 0;
}

function getFileExtension(filename) {
    return filename.split('.').pop();
}

function removeFileExtension(filename) {
    return filename.split('.').slice(0, -1).join('.');
}

function getRandomColor() {
    return '#' + Math.round(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0');
}

String.prototype.parseTransform = function() {
    var prop = ['translate', 'matrix', 'rotate', 'skewX', 'skewY', 'scale'];
    var val = this.match(/(translate|matrix|rotate|skewX|skewY|scale)\(.*?\)/g);
    var obj = {};
    if (val) {
        for (var i = 0, length = val.length; i < length; i++) {
            var item = val[i];
            var index = item.indexOf('(');
            var v = item.substring(index + 1, item.length - 1).split(/\,|\s/);
            var n = item.substring(0, index);
            obj[n] = {};
            switch (n) {
                case 'translate':
                    obj[n].x = +v[0] || 0;
                    obj[n].y = +v[1] || 0;
                    break;
                case 'scale':
                    obj[n].x = +v[0] || 1;
                    obj[n].y = +v[1] || 1;
                    break;
                case 'rotate':
                    obj[n].a = +v[0] || 0;
                    obj[n].x = +v[1] || 0;
                    obj[n].y = +v[2] || 0;
                    break;
                case 'skewX':
                case 'skewY':
                    obj[n].a = +v[0];
                    break;
                case 'matrix':
                    obj[n].a = +v[0] || 0;
                    obj[n].b = +v[1] || 0;
                    obj[n].c = +v[2] || 0;
                    obj[n].d = +v[3] || 0;
                    obj[n].e = +v[4] || 0;
                    obj[n].f = +v[5] || 0;
                    break;
            }
        }
    }

    obj.toString = function() {
        var builder = [];
        for (var i = 0, length = prop.length; i < length; i++) {
            var n = prop[i];
            var o = this[n];
            if (!o)
                continue;
            switch (n) {
                case 'translate':
                case 'scale':
                    builder.push(n + '(' + o.x + ',' + o.y + ')');
                    break;
                case 'rotate':
                    builder.push(n + '(' + o.a + ' ' + o.x + ' ' + o.y + ')');
                    break;
                case 'skewX':
                case 'skewY':
                    builder.push(n + '(' + o.a + ')');
                    break;
                case 'matrix':
                    builder.push(n + '(' + o.a + ',' + o.b + ',' + o.c + ',' + o.d + ',' + o.e + ',' + o.f + ')');
                    break;
            }
        }
        return builder.join(' ');
    };

    return obj;
};