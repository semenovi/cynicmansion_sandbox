var canvas = document.getElementById("scr"),
	paint = document.getElementById("paint"),
	paint_bckgr = document.getElementById("paint_bckgr"),
	canvas_front = document.getElementById("scr_2"),
	hide_button = document.getElementById("hide"),
	container_hiding = document.getElementById("container_hiding"),
	gui_form = document.getElementById("gui_form"),
	add_npc = document.getElementById("add_npc"),
	del_npc = document.getElementById("del_npc"),
	npc_id = document.getElementById("npc_id"),
	back_change = document.getElementById("back_change"),
	lh = document.getElementById("lh"),
	rh = document.getElementById("rh"),
	ll = document.getElementById("ll"),
	rl = document.getElementById("rl"),
	fat = document.getElementById("fat"),
	mind = document.getElementById("mind"),
	direction = document.getElementById("direction"),
	eyes = document.getElementById("eyes"),
	mouth = document.getElementById("mouth"),
	smooth = document.getElementById("smooth"),
	brush = document.getElementById("brush"),
	brush_layer = document.getElementById("brush_layer"),
	clear = document.getElementById("clear"),
	add_rp = document.getElementById("add_rp"),
	del_rp = document.getElementById("del_rp"),
	rp_text = document.getElementById("rp_text"),
	rp_id = document.getElementById("rp_id"),
	frames_number = document.getElementById("frames_number"),
	show_upload_btns = document.getElementById("show_upload_btns"),
	export_comics = document.getElementById("export_comics"),
	change_rp_color = document.getElementById("change_rp_color"),
	change_brush_color = document.getElementById("change_brush_color"),
	export_png = document.getElementById("export_png"),
	btns_placeholder = document.getElementById("btns_placeholder"),
	export_comics = document.getElementById("export_comics"),
	header = document.getElementById("header"),
	skin_id = document.getElementById("skin_id"),
	hided = false,
	btns_hided = true,
	color = true,
	brush_color = true,
	last_btns_number = 0,
	form_container = document.getElementById("form_container"),
	x = document.getElementById("x"),
	y = document.getElementById("y"),
	rpx = document.getElementById("rpx"),
	rpy = document.getElementById("rpy"),
    ctx     = canvas.getContext('2d'),
	pctx = paint.getContext('2d'),
	ppaint_bckgr = paint_bckgr.getContext('2d'),
	pcanvas_front = canvas_front.getContext('2d'),
	bcgrnd = new Image(),
	bcgrnd_front = new Image(),
	sw = window.innerWidth,
	sh = window.innerHeight,
	number_of_npc = 0,
	number_of_rp = 0,
	rp_counter = 0,
	id_counter = 0,
	frame_counter = 0,
	npcs = new Array(),
	rps = new Array(),
	smooth_enabled = false,
	brush_layer_n = 1;

var i = 1;
while(i < 3)
{
	var option = document.createElement("option");
	option.text = i + '';
	back_change.add(option);
	i = i + 1;
}
back_change.selectedIndex = 1;
bcgrnd.src ='back_344/' +  back_change.value + '.png';
bcgrnd_front.src ='back_344/' +  back_change.value + '_2.png';

i = 1;
while(i < 3)
{
	var option = document.createElement("option");
	option.text = i + '';
	brush_layer.add(option);
	i = i + 1;
}
brush_layer.selectedIndex = 1;
brush_layer_n = brush_layer.selectedIndex;

scale = Math.min(sw / bcgrnd.width, sh / bcgrnd.height);

max_width_in_gui = form_container.getBoundingClientRect().width - 80 + 'px';
max_width_in_gui_min = 'calc(' + (form_container.getBoundingClientRect().width - 80) + 'px - 6px)';

// NPC
class npc
{
	constructor(id)
	{
		this.id = id;
		this.body = new Image();
		this.head = new Image();
		this.eyes = new Image();
		this.mouth = new Image();
		this.body.src = 'body/body/5.png';
		this.head.src = 'body/head/3.png';
		this.eyes.src = 'body/eyes/1.png';
		this.mouth.src = 'body/mouth/6.png';
		this.bp = 5;
		this.hp = 3;
		this.ep = 1;
		this.mp = 6;
		this.lhp = 4;
		this.rhp = 4;
		this.llp = 5;
		this.rlp = 5;
		this.lh = new Image();
		this.rh = new Image();
		this.ll = new Image();
		this.rl = new Image();
		this.lh.src = 'body/hands/l4.png';
		this.rh.src = 'body/hands/r4.png';
		this.ll.src = 'body/legs/l5.png';
		this.rl.src = 'body/legs/r5.png';
		this.bl = true;
		this.hl = true;
		this.el = true;
		this.ml = true;
		this.lhl = true;
		this.rhl = true;
		this.lll = true;
		this.rll = true;
		this.x = 0;
		this.y = 0;
		this.direction = 1;
	}
	draw(ctex)
	{
		var xx, yy, nlhl, nrhl, nlll, nrll, nbl, nhl, nel, nml;
		xx = this.x;
		yy = this.y;
		nlhl = this.lhl;
		nrhl = this.rhl;
		nlll = this.lll;
		nrll = this.rll;
		nbl = this.bl;
		nhl = this.hl;
		nel = this.el;
		nml = this.ml;
		this.ll.onload = function()
		{
			if(nlll)
			{
				ctex.drawImage(this, xx, yy, this.width * scale, this.height * scale);
				nlll = false;
			}
		};
		this.lll = nlll;
		this.body.onload = function()
		{
			if(nbl)
			{
				ctex.drawImage(this, xx, yy, this.width * scale, this.height * scale);
				nbl = false;
			}
		};
		this.bl = nbl;
		this.head.onload = function()
		{
			if(nhl)
			{
				ctex.drawImage(this, xx, yy, this.width * scale, this.height * scale);
				nhl = false;
			}
		};
		this.hl = nhl;
		this.eyes.onload = function()
		{
			if(nel)
			{
				ctex.drawImage(this, xx, yy, this.width * scale, this.height * scale);
				nel = false;
			}
		};
		this.el = nel;
		this.mouth.onload = function()
		{
			if(nml)
			{
				ctex.drawImage(this, xx, yy, this.width * scale, this.height * scale);
				nml = false;
			}
		};
		this.el = nml;
		this.lh.onload = function()
		{
			if(nlhl)
			{
				ctex.drawImage(this, xx, yy, this.width * scale, this.height * scale);
				nlhl = false;
			}
		};
		this.lhl = nlhl;
		this.rh.onload = function()
		{
			if(nrhl)
			{
				ctex.drawImage(this, xx, yy, this.width * scale, this.height * scale);
				nrhl = false;
			}
		};
		this.rhl = nrhl;
		this.rl.onload = function()
		{
			if(nrll)
			{
				ctex.drawImage(this, xx, yy, this.width * scale, this.height * scale);
				nrll = false;
			}
		};
		this.rll = nrll;
	}
	move(nx, ny)
	{
		this.x = nx;
		this.y = ny;
	}
	change_direction(pose)
	{
		this.direction = Number(pose);
		if (this.direction == 1)
		{
			this.lh.src = 'body/hands/l' + this.lhp + '.png';
			this.rh.src = 'body/hands/r' + this.rhp + '.png';
			this.ll.src = 'body/legs/l' + this.llp + '.png';
			this.rl.src = 'body/legs/r' + this.rlp + '.png';
			this.body.src = 'body/body/' + this.bp + '.png';
			this.head.src = 'body/head/' + this.hp + '.png';
			this.eyes.src = 'body/eyes/' + this.ep + '.png';
			this.mouth.src = 'body/mouth/' + this.mp + '.png';
		}
		else if (this.direction == 2)
		{
			this.lh.src = 'body/hands_reversed/l' + this.lhp + '.png';
			this.rh.src = 'body/hands_reversed/r' + this.rhp + '.png';
			this.ll.src = 'body/legs_reversed/l' + this.llp + '.png';
			this.rl.src = 'body/legs_reversed/r' + this.rlp + '.png';
			this.body.src = 'body/body_reversed/' + this.bp + '.png';
			this.head.src = 'body/head_reversed/' + this.hp + '.png';
			this.eyes.src = 'body/eyes_reversed/' + this.ep + '.png';
			this.mouth.src = 'body/mouth_reversed/' + this.mp + '.png';
		}
		
		this.direction = Number(pose);
		this.change_lh(this.lhp);
		this.change_rh(this.rhp);
		this.change_ll(this.llp);
		this.change_rl(this.rlp);
		this.change_body(this.bp);
		this.change_head(this.hp);
		this.change_eyes(this.ep);
		this.change_mouth(this.mp);
	}
	redraw(ctex)
	{
			ctex.drawImage(this.ll, this.x, this.y, this.ll.width * scale, this.ll.height * scale);
			ctex.drawImage(this.body, this.x, this.y, this.body.width * scale, this.body.height * scale);
			ctex.drawImage(this.head, this.x, this.y, this.head.width * scale, this.head.height * scale);
			ctex.drawImage(this.eyes, this.x, this.y, this.eyes.width * scale, this.eyes.height * scale);
			ctex.drawImage(this.mouth, this.x, this.y, this.mouth.width * scale, this.mouth.height * scale);
			ctex.drawImage(this.lh, this.x, this.y, this.lh.width * scale, this.lh.height * scale);
			ctex.drawImage(this.rh, this.x, this.y, this.rh.width * scale, this.rh.height * scale);
			ctex.drawImage(this.rl, this.x, this.y, this.rl.width * scale, this.rl.height * scale);
	}
}

// GUI

var lx = (sw - bcgrnd.width * scale) / 2,
	rx = lx + bcgrnd.width * scale,
	ty = 0,
	by = bcgrnd.height * scale;

canvas.style.left = lx + 'px';
canvas.width = rx - lx;
canvas.height = by;

paint.style.left = lx + 'px';
paint.width = rx - lx;
paint.height = by;

paint_bckgr.style.left = lx + 'px';
paint_bckgr.width = rx - lx;
paint_bckgr.height = by;

canvas_front.style.left = lx + 'px';
canvas_front.width = rx - lx;
canvas_front.height = by;

if (smooth_enabled)
{
	ctx.imageSmoothingEnabled = true;
	ctx.mozImageSmoothingEnabled = true;
	ctx.msImageSmoothingEnabled = true;
	ctx.webkitImageSmoothingEnabled = true;
	pcanvas_front.imageSmoothingEnabled = true;
	pcanvas_front.mozImageSmoothingEnabled = true;
	pcanvas_front.msImageSmoothingEnabled = true;
	pcanvas_front.webkitImageSmoothingEnabled = true;
}
else
{
	ctx.imageSmoothingEnabled = false;
	ctx.mozImageSmoothingEnabled = false;
	ctx.msImageSmoothingEnabled = false;
	ctx.webkitImageSmoothingEnabled = false;
	pcanvas_front.imageSmoothingEnabled = false;
	pcanvas_front.mozImageSmoothingEnabled = false;
	pcanvas_front.msImageSmoothingEnabled = false;
	pcanvas_front.webkitImageSmoothingEnabled = false;
}

function bck()
{
	ctx.drawImage(bcgrnd, 0, 0, canvas.width, canvas.height);
}
bcgrnd.onload = bck;

function bck_front()
{
	pcanvas_front.drawImage(bcgrnd_front, 0, 0, canvas.width, canvas.height);
}
bcgrnd_front.onload = bck;

hide_button.addEventListener('click', function(event)
{
	if(hided)
	{
		form_container.style.height = '90%';
		gui_form.style.overflowY = 'auto';
		hide_button.value = 'Свернуть';
		container_hiding.style.visibility = 'visible';
		hided = false;
		//console.log('edtitor showed');
	}
	else
	{
		form_container.style.height = '47px';
		gui_form.style.overflowY = 'hidden';
		hide_button.value = 'Показать';
		container_hiding.style.visibility = 'hidden';
		hided = true;
		//console.log('editor hided');
	}
});

class rp
{
	constructor(text, x, y, color)
	{
		this.text = text;
		this.x = x;
		this.y = y;
		this.color = color
	}
	move(x, y)
	{
		this.x = x;
		this.y = y;
	}
	change_text(text)
	{
		this.text = text;
	}
}

function render()
{
	bck();
	var n = npc_id.length;
	pcanvas_front.clearRect(0, 0, paint.width, paint.height);
	while(n > 1)
	{
		npcs[n - 2].redraw(pcanvas_front);
		n = n - 1;
	}
	bck_front();
	n = rps.length;
	while(n > 0)
	{
		if(rps[n - 1].color)
		{
			pcanvas_front.fillStyle = "black";
		}
		else
		{
			pcanvas_front.fillStyle = "white";
		}
		pcanvas_front.font = 18 * scale + "px Times";
		pcanvas_front.fillText(rps[n - 1].text, rps[n - 1].x, rps[n - 1].y);
		n = n - 1;
	}
}

x.addEventListener('input', function(event)
{
	if(npc_id.selectedIndex > 0)
	{
		npcs[npc_id.selectedIndex - 1].move((Number(x.value) * scale * 2.25 - 27 * scale), npcs[npc_id.selectedIndex - 1].y);
		render();
	}
});

y.addEventListener('input', function(event)
{
	if(npc_id.selectedIndex > 0)
	{
		npcs[npc_id.selectedIndex - 1].move(npcs[npc_id.selectedIndex - 1].x, (Number(y.value) * scale * 1.26 - 22 * scale));
		render();
	}
});

add_npc.addEventListener('click', function(event)
{
	number_of_npc = number_of_npc + 1;
	id_counter = id_counter + 1;
	var nnpc = new npc(id_counter);
	npcs[number_of_npc - 1] = nnpc;
	var option = document.createElement("option");
	option.text = '' + id_counter;
	npc_id.add(option);
	npcs[number_of_npc - 1].move(90 * scale, 60 * scale);
	npcs[number_of_npc - 1].draw(ctx);
	npc_id.selectedIndex = npc_id.length - 1;
	x.value = (npcs[npc_id.selectedIndex - 1].x + 27 * scale) / (scale * 2.25);
	y.value = (npcs[npc_id.selectedIndex - 1].y + 22 * scale) / (scale * 1.26);
	lh.value = npcs[npc_id.selectedIndex - 1].lhp;
	rh.value = npcs[npc_id.selectedIndex - 1].rhp;
	ll.value = npcs[npc_id.selectedIndex - 1].llp;
	rl.value = npcs[npc_id.selectedIndex - 1].rlp;
	fat.value = npcs[npc_id.selectedIndex - 1].bp;
	mind.value = npcs[npc_id.selectedIndex - 1].hp;
	eyes.value = npcs[npc_id.selectedIndex - 1].ep;
	mouth.value = npcs[npc_id.selectedIndex - 1].mp;
	direction.value = npcs[npc_id.selectedIndex - 1].direction;
});

npc_id.addEventListener('input', function(event)
{
	if(npc_id.selectedIndex > 0)
	{
		x.value = (npcs[npc_id.selectedIndex - 1].x + 27 * scale) / (scale * 2.25);
		y.value = (npcs[npc_id.selectedIndex - 1].y + 22 * scale) / (scale * 1.26);
		lh.value = npcs[npc_id.selectedIndex - 1].lhp;
		rh.value = npcs[npc_id.selectedIndex - 1].rhp;
		ll.value = npcs[npc_id.selectedIndex - 1].llp;
		rl.value = npcs[npc_id.selectedIndex - 1].rlp;
		fat.value = npcs[npc_id.selectedIndex - 1].bp;
		mind.value = npcs[npc_id.selectedIndex - 1].hp;
		eyes.value = npcs[npc_id.selectedIndex - 1].ep;
		mouth.value = npcs[npc_id.selectedIndex - 1].mp;
	}
});

del_npc.addEventListener('click', function(event)
{
	if(npc_id.selectedIndex > 0)
	{
		npcs.splice(npc_id.selectedIndex - 1, 1);
		npc_id.remove(npc_id.selectedIndex);
		npc_id.selectedIndex = 0;
		number_of_npc = number_of_npc - 1;
		render();
	}
});

back_change.addEventListener('input', function(event)
{
	if(back_change.selectedIndex > 0)
	{
		bcgrnd.src = 'back_344/' + back_change.value + '.png';
		bcgrnd_front.src = 'back_344/' + back_change.value + '_2.png';
		render();
	}
});

lh.addEventListener('input', function(event)
{
	if(npc_id.selectedIndex > 0)
	{
		npcs[npc_id.selectedIndex - 1].change_lh(lh.value);
		render();
	}
});

rh.addEventListener('input', function(event)
{
	if(npc_id.selectedIndex > 0)
	{
		npcs[npc_id.selectedIndex - 1].change_rh(rh.value);
		render();
	}
});

ll.addEventListener('input', function(event)
{
	if(npc_id.selectedIndex > 0)
	{
		npcs[npc_id.selectedIndex - 1].change_ll(ll.value);
		render();
	}
});

rl.addEventListener('input', function(event)
{
	if(npc_id.selectedIndex > 0)
	{
		npcs[npc_id.selectedIndex - 1].change_rl(rl.value);
		render();
	}
});

fat.addEventListener('input', function(event)
{
	if(npc_id.selectedIndex > 0)
	{
		npcs[npc_id.selectedIndex - 1].change_body(fat.value);
		render();
	}
});

mind.addEventListener('input', function(event)
{
	if(npc_id.selectedIndex > 0)
	{
		npcs[npc_id.selectedIndex - 1].change_head(mind.value);
		render();
	}
});

direction.addEventListener('input', function(event)
{
	if(npc_id.selectedIndex > 0)
	{
		npcs[npc_id.selectedIndex - 1].change_direction(direction.value);
		render();
	}
});

eyes.addEventListener('input', function(event)
{
	if(npc_id.selectedIndex > 0)
	{
		npcs[npc_id.selectedIndex - 1].change_eyes(eyes.value);
		render();
	}
});

mouth.addEventListener('input', function(event)
{
	if(npc_id.selectedIndex > 0)
	{
		npcs[npc_id.selectedIndex - 1].change_mouth(mouth.value);
		render();
	}
});

form_container.addEventListener('mousemove', function(event)
{
	render();
});

var mouse = { x:0, y:0};
var draw = false, cdraw = false;

paint.addEventListener("mousedown", function(e)
{
	if(cdraw)
	{
		if (brush_layer_n == 1)
		{
			mouse.x = e.pageX - this.offsetLeft;
			mouse.y = e.pageY - this.offsetTop;
			draw = true;
			if (brush_color)
			{
				ppaint_bckgr.strokeStyle = "black";
			}
			else
			{
				ppaint_bckgr.strokeStyle = "white";
			}
			ppaint_bckgr.beginPath();
			ppaint_bckgr.moveTo(mouse.x, mouse.y);
			ppaint_bckgr.lineWidth = 1 * scale;
		}
		else if (brush_layer_n == 2)
		{
			mouse.x = e.pageX - this.offsetLeft;
			mouse.y = e.pageY - this.offsetTop;
			draw = true;
			if (brush_color)
			{
				pctx.strokeStyle = "black";
			}
			else
			{
				pctx.strokeStyle = "white";
			}
			pctx.beginPath();
			pctx.moveTo(mouse.x, mouse.y);
			pctx.lineWidth = 1 * scale;
		}
		
	}
});

paint.addEventListener("mousemove", function(e)
{
	if(cdraw)
	{
		if (brush_layer_n == 1)
		{
			if(draw==true){
				mouse.x = e.pageX - this.offsetLeft;
				mouse.y = e.pageY - this.offsetTop;
				ppaint_bckgr.lineTo(mouse.x, mouse.y);
				ppaint_bckgr.stroke();
			}
		}
		else if (brush_layer_n == 2)
		{
			if(draw==true){
				mouse.x = e.pageX - this.offsetLeft;
				mouse.y = e.pageY - this.offsetTop;
				pctx.lineTo(mouse.x, mouse.y);
				pctx.stroke();
			}
		}
	}
});

paint.addEventListener("mouseup", function(e)
{
	if(cdraw)
	{
		if (brush_layer_n == 1)
		{
			mouse.x = e.pageX - this.offsetLeft;
			mouse.y = e.pageY - this.offsetTop;
			ppaint_bckgr.lineTo(mouse.x, mouse.y);
			ppaint_bckgr.stroke();
			ppaint_bckgr.closePath();
			draw = false;
		}
		else if (brush_layer_n == 2)
		{
			mouse.x = e.pageX - this.offsetLeft;
			mouse.y = e.pageY - this.offsetTop;
			pctx.lineTo(mouse.x, mouse.y);
			pctx.stroke();
			pctx.closePath();
			draw = false;
		}
	}
});

brush.addEventListener('click', function(event)
{
	if (cdraw)
	{
		brush.value = "Включить карандаш";
		cdraw = false;
	}
	else
	{
		brush.value = "Выключить карандаш";
		cdraw = true;
	}
});

brush_layer.addEventListener('input', function(event)
{
	if(brush_layer.selectedIndex > 0)
	{
		brush_layer_n = brush_layer.selectedIndex;
		render();
	}
});

change_brush_color.addEventListener('click', function(event)
{
	brush_color = !brush_color;
});

clear.addEventListener('click', function(event)
{
	if (brush_layer_n == 1)
	{
		ppaint_bckgr.clearRect(0, 0, paint.width, paint.height);
	}
	else if (brush_layer_n == 2)
	{
		pctx.clearRect(0, 0, paint.width, paint.height);
	}
});

add_rp.addEventListener('click', function(event)
{
	number_of_rp = number_of_rp + 1;
	rp_counter = rp_counter + 1;
	var nrp = new rp(rp_text.value, Number(rpx.value) * scale * 2.50, Number(rpy.value) * scale * 1.96 + 13 * scale, color);
	rps[number_of_rp - 1] = nrp;
	var option = document.createElement("option");
	option.text = '' + rp_counter;
	rp_id.add(option);
	rp_id.selectedIndex = rp_id.length - 1;
	render();
});

del_rp.addEventListener('click', function(event)
{
	if(rp_id.selectedIndex > 0)
	{
		rps.splice(rp_id.selectedIndex - 1, 1);
		rp_id.remove(rp_id.selectedIndex);
		rp_id.selectedIndex = 0;
		number_of_rp = number_of_rp - 1;
		render();
	}
});

change_rp_color.addEventListener('click', function(event)
{
	if(rp_id.selectedIndex > 0)
	{
		rps[rp_id.selectedIndex - 1].color = !rps[rp_id.selectedIndex - 1].color;
		color = !color;
		render();
	}
	else
	{
		color = !color;
	}
});

rpx.addEventListener('input', function(event)
{
	if(rp_id.selectedIndex > 0)
	{
		rps[rp_id.selectedIndex - 1].move(Number(rpx.value) * scale * 2.50, rps[rp_id.selectedIndex - 1].y);
		render();
	}
});

rpy.addEventListener('input', function(event)
{
	if(rp_id.selectedIndex > 0)
	{
		rps[rp_id.selectedIndex - 1].move(rps[rp_id.selectedIndex - 1].x, Number(rpy.value) * scale * 1.96 + 13 * scale);
		render();
	}
});

rp_text.addEventListener('input', function(event)
{
	if(rp_id.selectedIndex > 0)
	{
		rps[rp_id.selectedIndex - 1].change_text(rp_text.value);
		render();
	}
});

export_png.addEventListener('click', function (e)
{
	frame_counter = frame_counter + 1;
	ctx.drawImage(paint_bckgr, 0, 0);
	ctx.drawImage(canvas_front, 0, 0);
	ctx.drawImage(paint, 0, 0);
    Canvas2Image.saveAsPNG(canvas, ctx.width, ctx.height, frame_counter + '.png', smooth_enabled);
});

show_upload_btns.addEventListener('click', function(event)
{
	if(btns_hided)
	{
		btns_placeholder.style.visibility = 'visible';
		btns_placeholder.style.height = 'auto';
		show_upload_btns.value = 'Убрать кнопки';
		if(Number(frames_number.value) > last_btns_number)
		{
			var i = last_btns_number;
			while(i < frames_number.value)
			{
				var import_frame_btn = document.createElement("input");
				import_frame_btn.style = 'width:100% !important;';
				import_frame_btn.id = "import_frame_" + i;
				import_frame_btn.type = "file";
				btns_placeholder.appendChild(import_frame_btn);
				i = i + 1;
			}
		}
		else if(Number(frames_number.value) < last_btns_number)
		{
			var i = last_btns_number - 1;
			while(i >= frames_number.value)
			{
				btns_placeholder.removeChild(document.getElementById("import_frame_" + i));
				i = i - 1;
			}
		}
		last_btns_number = Number(frames_number.value);
		btns_hided = false;
	}
	else
	{
		btns_placeholder.style.visibility = 'hidden';
		btns_placeholder.style.height = '0px';
		show_upload_btns.value = 'Показать кнопки';
		btns_hided = true;
	}
});

export_comics.addEventListener('click', function (e)
{
	var imageLoader = document.getElementById("import_frame_" + 0);
		imageLoader.addEventListener('change', handleImage, false);

	function handleImage(e){
		var reader = new FileReader();
		reader.onload = function(event){
			var img = new Image();
			img.onload = function(){
				ctx.drawImage(img,0,0);
			}
			img.src = event.target.result;
		}
		reader.readAsDataURL(e.target.files[0]);     
	}
/*
	var imageLoader = document.getElementById('imageLoader');
		imageLoader.addEventListener('change', handleImage, false);
	var canvas = document.getElementById('imageCanvas');
	var ctx = canvas.getContext('2d');


	function handleImage(e){
		var reader = new FileReader();
		reader.onload = function(event){
			var img = new Image();
			img.onload = function(){
				canvas.width = img.width;
				canvas.height = img.height;
				ctx.drawImage(img,0,0);
			}
			img.src = event.target.result;
		}
		reader.readAsDataURL(e.target.files[0]);     
}
*/
	
});

smooth.addEventListener('click', function (e)
{
	if (smooth_enabled)
	{
		smooth.value = 'Включить сглаживание';
		ctx.imageSmoothingEnabled = false;
		ctx.mozImageSmoothingEnabled = false;
		ctx.msImageSmoothingEnabled = false;
		ctx.webkitImageSmoothingEnabled = false;
		pcanvas_front.imageSmoothingEnabled = false;
		pcanvas_front.mozImageSmoothingEnabled = false;
		pcanvas_front.msImageSmoothingEnabled = false;
		pcanvas_front.webkitImageSmoothingEnabled = false;
		smooth_enabled = false;
	}
	else
	{
		smooth.value = 'Выключить сглаживание';
		ctx.imageSmoothingEnabled = true;
		ctx.mozImageSmoothingEnabled = true;
		ctx.msImageSmoothingEnabled = true;
		ctx.webkitImageSmoothingEnabled = true;
		pcanvas_front.imageSmoothingEnabled = true;
		pcanvas_front.mozImageSmoothingEnabled = true;
		pcanvas_front.msImageSmoothingEnabled = true;
		pcanvas_front.webkitImageSmoothingEnabled = true;
		smooth_enabled = true;
	}
	render();
});