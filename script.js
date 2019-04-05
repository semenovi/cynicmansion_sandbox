// get the elements for the gui

// getting canvases
var canvas				= document.getElementById("scr"),
	paint				= document.getElementById("paint"),
	paint_bckgr			= document.getElementById("paint_bckgr"),
	canvas_front		= document.getElementById("scr_2"),
	splash_c 			= document.getElementById('splash'),
	comics_canvas 		= document.createElement('canvas');
		
// getting their context
var ctx					= canvas.getContext('2d'),
	pctx				= paint.getContext('2d'),
	ppaint_bckgr		= paint_bckgr.getContext('2d'),
	pcanvas_front		= canvas_front.getContext('2d'),
	cc_ctx 				= comics_canvas.getContext('2d'),
	splash_ctx 			= splash_c.getContext('2d');
	
// getting buttons, containers, text fields etc.
var hide_button 		= document.getElementById("hide"),
	
	form_container 		= document.getElementById("form_container"),
	container_hiding 	= document.getElementById("container_hiding"),
	gui_form 			= document.getElementById("gui_form"),
	
	// npc editor
	add_npc 			= document.getElementById("add_npc"),
	npc_id 				= document.getElementById("npc_id"),
	move_npc 			= document.getElementById("move_npc"),
	del_npc 			= document.getElementById("del_npc"),
	skin_id 			= document.getElementById("skin_id"),
	body 				= document.getElementById("body"),
	head 				= document.getElementById("head"),
	
	// pose
	direction 			= document.getElementById("direction"),
	eyes 				= document.getElementById("eyes"),
	mouth 				= document.getElementById("mouth"),
	lh 					= document.getElementById("lh"),
	rh 					= document.getElementById("rh"),
	ll 					= document.getElementById("ll"),
	rl 					= document.getElementById("rl"),
	x 					= document.getElementById("x"),
	y 					= document.getElementById("y"),
	
	// background
	back_change 		= document.getElementById("back_change"),
	
	// additional instruments
	smooth 				= document.getElementById("smooth"),
	brush 				= document.getElementById("brush"),
	brush_layer 		= document.getElementById("brush_layer"),
	change_brush_color 	= document.getElementById("change_brush_color"),
	clear 				= document.getElementById("clear"),
	
	// speech editor
	add_rp 				= document.getElementById("add_rp"),
	rp_id 				= document.getElementById("rp_id"),
	rp_text 			= document.getElementById("rp_text"),
	move_rp 			= document.getElementById("move_rp"),
	del_rp 				= document.getElementById("del_rp"),
	rpx 				= document.getElementById("rpx"),
	rpy 				= document.getElementById("rpy"),
	change_rp_color 	= document.getElementById("change_rp_color"),
	
	// export one frame
	export_png 			= document.getElementById("export_png"),
	
	// comics creator
	frames_number 		= document.getElementById("frames_number"),
	show_upload_btns 	= document.getElementById("show_upload_btns"),
	// new buttons for uploading will be spawn here
	btns_placeholder 	= document.getElementById("btns_placeholder"),
	export_comics 		= document.getElementById("export_comics");
	
// global variables for control the gui
var hided 				= false, // are gui hided?
	btns_hided 			= true, // are buttons for upload hided?
	color 				= true, // are black color using for current speech?
	brush_color 		= true, // are black color using for painting on canvas?
	bcgrnd 				= new Image(), // background image object
	bcgrnd_front 		= new Image(),	// upper picture of background image
										// object
	sw 					= window.innerWidth,
	sh 					= window.innerHeight,
	number_of_npc 		= 0,	// number and counter have a differense:
								// number can be decreased
	number_of_rp 		= 0,
	number_of_backs		= 2,
	number_of_layers 	= 2,
	rp_counter 			= 0,
	id_counter 			= 0,
	frame_counter 		= 0,
	comics_counter 		= 0,
	npcs 				= new Array(), // npcs that displayed on canvas
	rps 				= new Array(), // speechs that displayed on canvas
	comics_images 		= new Array(), // speechs that displayed on canvas
	smooth_enabled 		= false,	// are smoothing enabled for canvases and
									// export pictures?
	brush_layer_n 		= 1, // which canvas intended for painting now?
	max_width_in_gui 	=
form_container.getBoundingClientRect().width - 80 + 'px',
	max_width_in_gui_min=
'calc(' + (form_container.getBoundingClientRect().width - 80) + 'px - 6px)';

// image arrays
var splash 				= new Array(),
	bcgrnd 				= new Array(),
	bcgrnd_front 		= new Array(),
	skin 				= new Array(),
	body 				= new Array(),
	head 				= new Array(),
	eyes 				= new Array(),
	mouth 				= new Array(),
	lh 					= new Array(),
	rh 					= new Array(),
	ll 					= new Array(),
	rl 					= new Array();

// path masks for image files
var splash_path 		= 'splash_screen/',
	bcgrnd_path 		= 'back_344/',
	bcgrnd_front_path 	= 'back_344/front',
	skin_path 			= 'skins/',
	body_path 			= 'body/body/',
	body_path_r 		= 'body/body/reversed/',
	head_path 			= 'body/head/',
	head_path_r 		= 'body/head/reversed/',
	eyes_path 			= 'body/eyes/',
	eyes_path_r 		= 'body/eyes/reversed/',
	mouth_path 			= 'body/mouth/',
	mouth_path_r 		= 'body/mouth/reversed/',
	lh_path 			= 'body/hands/l',
	lh_path_r 			= 'body/hands/reversed/l',
	rh_path 			= 'body/hands/r',
	rh_path_r 			= 'body/hands/reversed/r',
	ll_path 			= 'body/legs/l',
	ll_path_r 			= 'body/legs/reversed/l',
	rl_path 			= 'body/legs/r';
	rl_path_r 			= 'body/legs/reversed/r';

// image arrays size
// multiplied by 2, because exists "left" version
var splash_size 		= 8,
	bcgrnd_size			= 2,
	bcgrnd_front_size 	= 2,
	skin_size 			= 0,
	body_size 			= 10 * 2,
	head_size 			= 10 * 2,
	eyes_size 			= 5 * 2,
	mouth_size 			= 6 * 2,
	lh_size 			= 10 * 2,
	rh_size 			= 10 * 2,
	ll_size 			= 10 * 2,
	rl_size 			= 10 * 2;

// image counters
var splash_loaded 		= 0,
	bcgrnd_loaded 		= 0,
	bcgrnd_front_loaded = 0,
	skin_loaded 		= 0,
	body_loaded 		= 0,
	head_loaded 		= 0,
	eyes_loaded 		= 0,
	mouth_loaded 		= 0,
	lh_loaded 			= 0,
	rh_loaded 			= 0,
	ll_loaded 			= 0,
	rl_loaded 			= 0;


class image_bank
{
	constructor(id, path, number, splash_link)
	{
		this.id = id;
		this.path = path;
		this.number = number;
		this.counter = 0;
		this.bank = new Array();
	}
	increase_counter()
	{
		this.counter = this.counter + 1;
		if(this.counter == this.number)
		{
			splash_link();
		}
	}
	start_loading()
	{
		var i = 1;
		while (i <= this.number)
		{
			this.bank[i - 1] = new Image();
			this.bank[i - 1].src = this.path + i + '.png';
			this.bank[i - 1].onload = function()
			{
				this.increase_counter();
			};
			i = i + 1;
		}
	}
}

var splash= new image_bank('splash', 'splash_screen/', 8, show_splash);
var loading = 0;
var timer_splash;
form_container.style.visibility = 'hidden';
/*
var end_of_animation = new Event('anim_end');
window.addEventListener('anim_end', function (e) {
    console.log('printer state changed', e.detail);
});
*/
window.dispatchEvent(evt);
function show_splash()
{
	if(loading == 0)
	{
		// canvas moving
		splash_c.style.left = '20%';
		splash_c.width = sw * 0.6 - 10;
		splash_c.height = (sw * 0.6 - 10) / 2;
		splash_c.style.top = (sh - splash_c.height) / 2 + 'px';
		
		splash_ctx.drawImage(
splash.bank[0], 0, 0, splash_c.width, splash_c.height);
		
		//timer_splash = setTimeout(show_splash,
//Math.floor(Math.random() * (3000 - 500 + 1)) + 500);
		loading = loading + 1;
	}
	else if(loading == 1)
	{
		loading = loading + 1;	
	}
	else if(splash_loaded==splash_size&&splash_counter>0&&splash_counter<7)
	{
		splash_ctx.drawImage(
splash[splash_counter], 0, 0, splash_c.width, splash_c.height);
		clearTimeout(timer_splash);
		timer_splash = setTimeout(show_splash,
Math.floor(Math.random() * (1000 - 50 + 1)) + 50);
		splash_counter = splash_counter + 1;
	}
	else if(splash_loaded == splash_size && splash_counter > 6)
	{
		window.dispatchEvent(end_of_animation);
		splash_ctx.drawImage(
splash[7], 0, 0, splash_c.width, splash_c.height);
		clearTimeout(timer_splash);
	}
}

function show_gui()
{
	
}

/*
// GUI init
// background
i = 1;
while(i <= number_of_backs)
{
	var option = document.createElement("option");
	option.text = i + '';
	back_change.add(option);
	i = i + 1;
}
back_change.selectedIndex = 1;
bcgrnd.src ='back_344/' +  back_change.value + '.png';
bcgrnd_front.src ='back_344/' +  back_change.value + '_2.png';

// painting layers
i = 1;
while(i <= number_of_layers)
{
	var option = document.createElement("option");
	option.text = i + '';
	brush_layer.add(option);
	i = i + 1;
}
brush_layer.selectedIndex = 1;
brush_layer_n = brush_layer.selectedIndex;

// buttons disabling/enabling
function switch_npc_gui()
{
	move_npc.disabled = !move_npc.disabled;
	del_npc.disabled = !del_npc.disabled;
	skin_id.disabled = !skin_id.disabled;
	body.disabled = !body.disabled;
	head.disabled = !head.disabled;

	direction.disabled = !direction.disabled;
	eyes.disabled = !eyes.disabled;
	mouth.disabled = !mouth.disabled;
	lh.disabled = !lh.disabled;
	rh.disabled = !rh.disabled;
	ll.disabled = !ll.disabled;
	rl.disabled = !rl.disabled;
	x.disabled = !x.disabled;
	y.disabled = !y.disabled;
}

// speech disabling/enabling
function switch_rp_gui()
{
	move_rp.disabled = !move_rp.disabled;
	del_rp.disabled = !del_rp.disabled;
	rpx.disabled = !rpx.disabled;
	rpy.disabled = !rpy.disabled;
	change_rp_color.disabled = !change_rp_color.disabled;
}

// export comics button disabling/enabling
function switch_comics_gui()
{
	export_comics.disabled = !export_comics.disabled;
}

// disabling
switch_npc_gui();
switch_rp_gui();
switch_comics_gui();

// scale is calculated automatically, don't try change it here
var scale 	= 0,
	lx 		= 0, // |--
	rx 		= 0, // --|
	ty 		= 0, // ''|''
	by 		= 0; // _|_

// if flag is true, scale variables are initialized
// bck means background, but when you use this function for the first time,
// the user interface is configured.
var flag_bck = true;
function bck()
{
	if (flag_bck)
	{
		scale 	= Math.min(sw / bcgrnd.width, sh / bcgrnd.height),
		lx 		= (sw - bcgrnd.width * scale) / 2,
		rx 		= lx + bcgrnd.width * scale,
		ty 		= 0,
		by 		= bcgrnd.height * scale;
		
		// init a canvases size and position
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
		
		flag_bck = !flag_bck;
	}
	
	// draw the background
	ctx.drawImage(bcgrnd, 0, 0, canvas.width, canvas.height);
}

// some backgrounds have two layers
bcgrnd.onload = bck;
function bck_front()
{
	pcanvas_front.drawImage(bcgrnd_front, 0, 0, canvas.width, canvas.height);
}
bcgrnd_front.onload = bck_front;

// Classes definition
// class for keep data about npc's on canvas
class npc
{
	constructor(id)
	{
		this.id 		= id;
		this.body 		= new Image();
		this.head 		= new Image();
		this.eyes 		= new Image();
		this.mouth 		= new Image();
		this.lh 		= new Image();
		this.rh 		= new Image();
		this.ll 		= new Image();
		this.rl 		= new Image();
		this.body.src 	= 'body/body/5.png';
		this.head.src 	= 'body/head/3.png';
		this.eyes.src 	= 'body/eyes/1.png';
		this.mouth.src 	= 'body/mouth/6.png';
		this.lh.src 	= 'body/hands/l4.png';
		this.rh.src 	= 'body/hands/r4.png';
		this.ll.src 	= 'body/legs/l5.png';
		this.rl.src 	= 'body/legs/r5.png';
		this.lbody 		= true;
		this.lhead 		= true;
		this.leyes 		= true;
		this.lmouth 	= true;
		this.llh 		= true;
		this.lrh 		= true;
		this.lll 		= true;
		this.lrl 		= true;
		// "p" means "position" or "pose"
		this.bp 		= 5;
		this.hp 		= 3;
		this.ep 		= 1;
		this.mp 		= 6;
		this.lhp 		= 4;
		this.rhp 		= 4;
		this.llp 		= 5;
		this.rlp 		= 5;
		this.x 			= 0;
		this.y 			= 0;
		this.direction 	= 1;
	}
	// init draw
	draw(ctex)
	{
		var xx, yy, gl_lbody, gl_lhead, gl_leyes, gl_lmouth, gl_llh, gl_lrh,
			gl_lll, gl_lrl;
		xx 			= this.x;
		yy 			= this.y;
		gl_lbody 	= this.lbody;
		gl_lhead 	= this.lhead;
		gl_leyes 	= this.leyes;
		gl_lmouth 	= this.lmouth;
		gl_llh 		= this.llh;
		gl_lrh 		= this.lrh;
		gl_lll 		= this.lll;
		gl_lrl 		= this.lrl;
		
		this.body.onload = function()
		{
			// if dont use this "if", onload will be
			// starting every time when change image src
			if(gl_lbody)
			{
				ctex.drawImage(this, xx, yy, this.width * scale, 
							   this.height * scale);
				gl_lbody = false;
			}
		};
		this.head.onload = function()
		{
			if(gl_lhead)
			{
				ctex.drawImage(this, xx, yy, this.width * scale,
							   this.height * scale);
				gl_lhead = false;
			}
		};
		this.eyes.onload = function()
		{
			if(gl_leyes)
			{
				ctex.drawImage(this, xx, yy, this.width * scale,
							   this.height * scale);
				gl_leyes = false;
			}
		};
		this.mouth.onload = function()
		{
			if(gl_lmouth)
			{
				ctex.drawImage(this, xx, yy, this.width * scale,
							   this.height * scale);
				gl_lmouth = false;
			}
		};
		this.lh.onload = function()
		{
			if(gl_llh)
			{
				ctex.drawImage(this, xx, yy, this.width * scale,
							   this.height * scale);
				gl_llh = false;
			}
		};
		this.rh.onload = function()
		{
			if(gl_lrh)
			{
				ctex.drawImage(this, xx, yy, this.width * scale,
							   this.height * scale);
				gl_lrh = false;
			}
		};
		this.ll.onload = function()
		{
			if(gl_lll)
			{
				ctex.drawImage(this, xx, yy, this.width * scale,
							   this.height * scale);
				gl_lll = false;
			}			
		};
		this.rl.onload = function()
		{
			if(gl_lrl)
			{
				ctex.drawImage(this, xx, yy, this.width * scale,
							   this.height * scale);
				gl_lrl = false;
			}
		};
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
			this.lh.src 	= 'body/hands/l' + this.lhp + '.png';
			this.rh.src 	= 'body/hands/r' + this.rhp + '.png';
			this.ll.src 	= 'body/legs/l' + this.llp + '.png';
			this.rl.src 	= 'body/legs/r' + this.rlp + '.png';
			this.body.src 	= 'body/body/' + this.bp + '.png';
			this.head.src 	= 'body/head/' + this.hp + '.png';
			this.eyes.src 	= 'body/eyes/' + this.ep + '.png';
			this.mouth.src 	= 'body/mouth/' + this.mp + '.png';
		}
		else if (this.direction == 2)
		{
			this.lh.src 	= 'body/hands_reversed/l' + this.lhp + '.png';
			this.rh.src 	= 'body/hands_reversed/r' + this.rhp + '.png';
			this.ll.src 	= 'body/legs_reversed/l' + this.llp + '.png';
			this.rl.src 	= 'body/legs_reversed/r' + this.rlp + '.png';
			this.body.src 	= 'body/body_reversed/' + this.bp + '.png';
			this.head.src 	= 'body/head_reversed/' + this.hp + '.png';
			this.eyes.src 	= 'body/eyes_reversed/' + this.ep + '.png';
			this.mouth.src 	= 'body/mouth_reversed/' + this.mp + '.png';
		}
	}
	change_pose(tail, pose)
	{
		if (tail == "body")
		{
			this.bp = pose;
		}
		else if(tail == "head")
		{
			this.hp = pose;
		}
		else if(tail == "eyes")
		{
			this.ep = pose;
		}
		else if(tail == "mouth")
		{
			this.mp = pose;
		}
		else if(tail == "lh")
		{
			this.lhp = pose;
		}
		else if(tail == "rh")
		{
			this.rhp = pose;
		}
		else if(tail == "ll")
		{
			this.llp = pose;
		}
		else if(tail == "rl")
		{
			this.rlp = pose;
		}
		this.change_direction(this.direction);
	}
	redraw(ctex)
	{
			ctex.drawImage(this.ll, this.x, this.y, this.ll.width * scale,
						   this.ll.height * scale);
			ctex.drawImage(this.body, this.x, this.y, this.body.width * scale,
						   this.body.height * scale);
			ctex.drawImage(this.head, this.x, this.y, this.head.width * scale,
						   this.head.height * scale);
			ctex.drawImage(this.eyes, this.x, this.y, this.eyes.width * scale,
						   this.eyes.height * scale);
			ctex.drawImage(this.mouth, this.x, this.y, this.mouth.width * scale,
						   this.mouth.height * scale);
			ctex.drawImage(this.lh, this.x, this.y, this.lh.width * scale,
						   this.lh.height * scale);
			ctex.drawImage(this.rh, this.x, this.y, this.rh.width * scale,
						   this.rh.height * scale);
			ctex.drawImage(this.rl, this.x, this.y, this.rl.width * scale,
						   this.rl.height * scale);
	}
}

// a "speech" class
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

// render function called every time when
// the image on the canvas must be updated
function render()
{
	// layer 0
	bck();
	
	// layer 1
	// clear
	pcanvas_front.clearRect(0, 0, paint.width, paint.height);
	// current number of npc
	var n = npc_id.length;
	while(n > 1)
	{
		npcs[n - 2].redraw(pcanvas_front);
		n = n - 1;
	}
	bck_front();
	// current number of speechs
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

// Description of the interactive part of the gui

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

// ----------------------------------------------------------------------------
// NPC EDITOR
// ----------------------------------------------------------------------------

add_npc.addEventListener('click', function(event)
{
	// updating counters
	number_of_npc = number_of_npc + 1;
	id_counter = id_counter + 1;
	
	// updating array of npc
	var nnpc = new npc(id_counter);
	npcs[number_of_npc - 1] = nnpc;
	
	// updating list of npc on a gui
	var option = document.createElement("option");
	option.text = '' + id_counter;
	npc_id.add(option);
	
	// create new npc
	npcs[number_of_npc - 1].move(90 * scale, 60 * scale);
	npcs[number_of_npc - 1].draw(pcanvas_front);
	
	// updating all gui to the default values
	npc_id.selectedIndex = npc_id.length - 1;
	switch_npc_gui();
	x.value = (npcs[npc_id.selectedIndex - 1].x + 27 * scale) / (scale * 3.05);
	y.value = (npcs[npc_id.selectedIndex - 1].y + 22 * scale) / (scale * 1.26);
	lh.value = npcs[npc_id.selectedIndex - 1].lhp;
	rh.value = npcs[npc_id.selectedIndex - 1].rhp;
	ll.value = npcs[npc_id.selectedIndex - 1].llp;
	rl.value = npcs[npc_id.selectedIndex - 1].rlp;
	body.value = npcs[npc_id.selectedIndex - 1].bp;
	head.value = npcs[npc_id.selectedIndex - 1].hp;
	eyes.value = npcs[npc_id.selectedIndex - 1].ep;
	mouth.value = npcs[npc_id.selectedIndex - 1].mp;
	direction.value = npcs[npc_id.selectedIndex - 1].direction;
	
	// yep, this is a timer((
	// idk how to effectively redraw the image in another way
	setTimeout(render, 250);
});

npc_id.addEventListener('input', function(event)
{
	// this and every next time "if" checks what option selected in list
	if(npc_id.selectedIndex > 0)
	{
		// updating all gui to the actual values
		x.value =
(npcs[npc_id.selectedIndex - 1].x + 27 * scale) / (scale * 3.05);
		y.value =
(npcs[npc_id.selectedIndex - 1].y + 22 * scale) / (scale * 1.26);
		lh.value = npcs[npc_id.selectedIndex - 1].lhp;
		rh.value = npcs[npc_id.selectedIndex - 1].rhp;
		ll.value = npcs[npc_id.selectedIndex - 1].llp;
		rl.value = npcs[npc_id.selectedIndex - 1].rlp;
		body.value = npcs[npc_id.selectedIndex - 1].bp;
		head.value = npcs[npc_id.selectedIndex - 1].hp;
		eyes.value = npcs[npc_id.selectedIndex - 1].ep;
		mouth.value = npcs[npc_id.selectedIndex - 1].mp;
		switch_npc_gui();
	}
	else
	{
		move_npc.value = "Двигать";
		switch_npc_gui();
		cmoving = false;
	}
});

var npc_mouse = { x:0, y:0};
var npc_delta = { x:0, y:0};
var moving = false, cmoving = false;

move_npc.addEventListener('click', function(event)
{
	if(npc_id.selectedIndex > 0)
	{
		if (cmoving)
		{
			move_npc.value = "Двигать";
			cmoving = false;
		}
		else
		{
			move_npc.value = "Не двигать";
			cmoving = true;
		}
	}
	else
	{
		move_npc.value = "Двигать";
		cmoving = false;
	}
});

paint.addEventListener("mousedown", function(e)
{
	if(cmoving)
	{
		npc_mouse.x = e.pageX - this.offsetLeft;
		npc_mouse.y = e.pageY - this.offsetTop;
		moving = true;	
	}
});

paint.addEventListener("mousemove", function(e)
{
	if(cmoving)
	{
		if(moving==true)
		{
			x_val = (npcs[npc_id.selectedIndex - 1].x + npc_delta.x + 27 * scale) / (scale * 3.05);
			y_val = (npcs[npc_id.selectedIndex - 1].y + npc_delta.y + 22 * scale) / (scale * 1.26);
			
			if (x_val > 0 && x_val < 100 && y_val > 0 && y_val < 100)
			{
				npc_delta.x = e.pageX - this.offsetLeft - npc_mouse.x;
				npc_delta.y = e.pageY - this.offsetTop - npc_mouse.y;
				npcs[npc_id.selectedIndex - 1].move(npcs[npc_id.selectedIndex - 1].x + npc_delta.x, npcs[npc_id.selectedIndex - 1].y + npc_delta.y);
				render();
				npc_mouse.x = e.pageX - this.offsetLeft;
				npc_mouse.y = e.pageY - this.offsetTop;
				x.value = x_val;
				y.value = y_val;
			}
			else
			{
				npcs[npc_id.selectedIndex - 1].move(npcs[npc_id.selectedIndex - 1].x - npc_delta.x, npcs[npc_id.selectedIndex - 1].y - npc_delta.y);
				render();
			}
			
		}
	}
});

paint.addEventListener("mouseup", function(e)
{
	if(cmoving)
	{
		npc_mouse.x = e.pageX - this.offsetLeft;
		npc_mouse.y = e.pageY - this.offsetTop;
		moving = false;
	}
});

paint.addEventListener("mouseleave", function(e)
{
	if(cmoving)
	{
		npc_mouse.x = e.pageX - this.offsetLeft;
		npc_mouse.y = e.pageY - this.offsetTop;
		moving = false;
	}
});

del_npc.addEventListener('click', function(event)
{
	if(npc_id.selectedIndex > 0)
	{
		// updating array
		npcs.splice(npc_id.selectedIndex - 1, 1);
		
		// updating list
		npc_id.remove(npc_id.selectedIndex);
		npc_id.selectedIndex = 0;
		
		// decreasing a number, not a counter
		number_of_npc = number_of_npc - 1;
		render();
		
		move_npc.value = "Двигать";
		move_npc.disabled = true;
		del_npc.disabled = true;
		cmoving = false;
	}
});


skin.addEventListener('click', function(event)
{
	if(npc_id.selectedIndex > 0)
	{
		
	}
});


body.addEventListener('input', function(event)
{
	if(npc_id.selectedIndex > 0)
	{
		npcs[npc_id.selectedIndex - 1].change_pose(this.id, body.value);
		render();
	}
});

head.addEventListener('input', function(event)
{
	if(npc_id.selectedIndex > 0)
	{
		npcs[npc_id.selectedIndex - 1].change_pose(this.id, head.value);
		render();
	}
});

// ----------------------------------------------------------------------------
// POSE EDITOR
// ----------------------------------------------------------------------------

x.addEventListener('input', function(event)
{
	if(npc_id.selectedIndex > 0)
	{
		npcs[npc_id.selectedIndex - 1].move((Number(x.value) * scale * 3.05 - 27 * scale), npcs[npc_id.selectedIndex - 1].y);
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
		npcs[npc_id.selectedIndex - 1].change_pose(this.id, lh.value);
		render();
	}
});

rh.addEventListener('input', function(event)
{
	if(npc_id.selectedIndex > 0)
	{
		npcs[npc_id.selectedIndex - 1].change_pose(this.id, rh.value);
		render();
	}
});

ll.addEventListener('input', function(event)
{
	if(npc_id.selectedIndex > 0)
	{
		npcs[npc_id.selectedIndex - 1].change_pose(this.id, ll.value);
		render();
	}
});

rl.addEventListener('input', function(event)
{
	if(npc_id.selectedIndex > 0)
	{
		npcs[npc_id.selectedIndex - 1].change_pose(this.id, rl.value);
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
		npcs[npc_id.selectedIndex - 1].change_pose(this.id, eyes.value);
		render();
	}
});

mouth.addEventListener('input', function(event)
{
	if(npc_id.selectedIndex > 0)
	{
		npcs[npc_id.selectedIndex - 1].change_pose(this.id, mouth.value);
		render();
	}
});

form_container.addEventListener('mousemove', function(event)
{
	// stupid try to rendering when its really needs
	render();
});

var paint_mouse = { x:0, y:0};
var draw = false, cdraw = false;
paint.addEventListener("mousedown", function(e)
{
	if(cdraw)
	{
		if (brush_layer_n == 1)
		{
			paint_mouse.x = e.pageX - this.offsetLeft;
			paint_mouse.y = e.pageY - this.offsetTop;
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
			ppaint_bckgr.moveTo(paint_mouse.x, paint_mouse.y);
			ppaint_bckgr.lineWidth = 1 * scale;
		}
		else if (brush_layer_n == 2)
		{
			paint_mouse.x = e.pageX - this.offsetLeft;
			paint_mouse.y = e.pageY - this.offsetTop;
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
			pctx.moveTo(paint_mouse.x, paint_mouse.y);
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
				paint_mouse.x = e.pageX - this.offsetLeft;
				paint_mouse.y = e.pageY - this.offsetTop;
				ppaint_bckgr.lineTo(paint_mouse.x, paint_mouse.y);
				ppaint_bckgr.stroke();
			}
		}
		else if (brush_layer_n == 2)
		{
			if(draw==true){
				paint_mouse.x = e.pageX - this.offsetLeft;
				paint_mouse.y = e.pageY - this.offsetTop;
				pctx.lineTo(paint_mouse.x, paint_mouse.y);
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
			paint_mouse.x = e.pageX - this.offsetLeft;
			paint_mouse.y = e.pageY - this.offsetTop;
			ppaint_bckgr.lineTo(paint_mouse.x, paint_mouse.y);
			ppaint_bckgr.stroke();
			ppaint_bckgr.closePath();
			draw = false;
		}
		else if (brush_layer_n == 2)
		{
			paint_mouse.x = e.pageX - this.offsetLeft;
			paint_mouse.y = e.pageY - this.offsetTop;
			pctx.lineTo(paint_mouse.x, paint_mouse.y);
			pctx.stroke();
			pctx.closePath();
			draw = false;
		}
	}
});

paint.addEventListener("mouseleave", function(e)
{
	if(cdraw)
	{
		if (brush_layer_n == 1)
		{
			if(draw==true){
				ppaint_bckgr.closePath();
				draw = false;
			}
		}
		else if (brush_layer_n == 2)
		{
			if(draw==true){
				pctx.closePath();
				draw = false;
			}
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
	
	var nrp = new rp(rp_text.value, Number(rpx.value) * scale * 3.30, Number(rpy.value) * scale * 1.96 + 13 * scale, color);
	rps[number_of_rp - 1] = nrp;
	
	var option = document.createElement("option");
	option.text = '' + rp_counter;
	rp_id.add(option);
	rp_id.selectedIndex = rp_id.length - 1;
	
	render();
});

var rp_mouse = { x:0, y:0};
var rp_delta = { x:0, y:0};
var rp_moving = false, rp_cmoving = false;

move_rp.addEventListener('click', function(event)
{
	if(rp_id.selectedIndex > 0)
	{
		if (rp_cmoving)
		{
			move_rp.value = "Двигать";
			rp_cmoving = false;
		}
		else
		{
			move_rp.value = "Не двигать";
			rp_cmoving = true;
		}
	}
	else
	{
		move_rp.value = "Не двигать";
		rp_cmoving = true;
	}
});

paint.addEventListener("mousedown", function(e)
{
	if(rp_cmoving)
	{
		rp_mouse.x = e.pageX - this.offsetLeft;
		rp_mouse.y = e.pageY - this.offsetTop;
		rp_moving = true;	
	}
});

paint.addEventListener("mousemove", function(e)
{
	if(rp_cmoving)
	{
		if(rp_moving==true)
		{
			x_val = (rps[rp_id.selectedIndex - 1].x) / (scale * 3.30);
			y_val = (rps[rp_id.selectedIndex - 1].y - 13 * scale) / (scale * 1.96);
			
			if (x_val > 0 && x_val < 100 && y_val > 0 && y_val < 100)
			{
				rp_delta.x = e.pageX - this.offsetLeft - rp_mouse.x;
				rp_delta.y = e.pageY - this.offsetTop - rp_mouse.y;
				rps[rp_id.selectedIndex - 1].move(rps[rp_id.selectedIndex - 1].x + rp_delta.x, rps[rp_id.selectedIndex - 1].y + rp_delta.y)
				render();
				rp_mouse.x = e.pageX - this.offsetLeft;
				rp_mouse.y = e.pageY - this.offsetTop;
				rpx.value = x_val;
				rpy.value = y_val;
			}
			else
			{
				rps[rp_id.selectedIndex - 1].move(rps[rp_id.selectedIndex - 1].x - rp_delta.x, rps[rp_id.selectedIndex - 1].y - rp_delta.y)
				render();
			}
			
		}
	}
});

paint.addEventListener("mouseup", function(e)
{
	if(rp_cmoving)
	{
		rp_mouse.x = e.pageX - this.offsetLeft;
		rp_mouse.y = e.pageY - this.offsetTop;
		rp_moving = false;
	}
});

paint.addEventListener("mouseleave", function(e)
{
	if(rp_cmoving)
	{
		rp_mouse.x = e.pageX - this.offsetLeft;
		rp_mouse.y = e.pageY - this.offsetTop;
		rp_moving = false;
	}
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

rp_id.addEventListener('input', function(event)
{
	if(rp_id.selectedIndex > 0)
	{
		rpx.value = (rps[rp_id.selectedIndex - 1].x) / (scale * 3.30);
		rpy.value = (rps[rp_id.selectedIndex - 1].y - 13 * scale) / (scale * 1.96);
	}
	else
	{
		move_rp.value = "Не двигать";
		rp_cmoving = true;
	}
});

rpx.addEventListener('input', function(event)
{
	if(rp_id.selectedIndex > 0)
	{
		rps[rp_id.selectedIndex - 1].move(Number(rpx.value) * scale * 3.30, rps[rp_id.selectedIndex - 1].y);
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
	
	// merge layers
	ctx.drawImage(paint_bckgr, 0, 0);
	ctx.drawImage(canvas_front, 0, 0);
	ctx.drawImage(paint, 0, 0);
	
    Canvas2Image.saveAsPNG(canvas, ctx.width, ctx.height, frame_counter + '.png', smooth_enabled);
});

show_upload_btns.addEventListener('click', function(event)
{
	var flag_ctx_sizes_corrected = true;
	if(btns_hided)
	{
		btns_placeholder.style.visibility = 'visible';
		btns_placeholder.style.height = 'auto';
		show_upload_btns.value = 'Убрать кнопки';
			var i = 0;
			while(i < frames_number.value)
			{
				var import_frame_btn = document.createElement("input");
				import_frame_btn.style = 'width:100% !important;';
				import_frame_btn.id = "import_frame_" + i;
				import_frame_btn.type = "file";
				import_frame_btn.accept="image/*"
				comics_images[i] = new Image();
				comics_images[i].id = i;
				var openFile = function(event)
				{
					var input = event.target;
					var reader = new FileReader();
					reader.id = comics_images[this.id.slice(13)].id;
					reader.onload = function()
					{
						var dataURL = reader.result;
						comics_images[this.id].src = dataURL;
						comics_images[this.id].onload = function()
						{
							if(comics_canvas.width != this.width)
							{
								flag_ctx_sizes_corrected = true;
							}
							if(flag_ctx_sizes_corrected)
							{
								comics_canvas.width = this.width;
								comics_canvas.height = this.height * Number(frames_number.value) - 0.024 * this.height * (Number(frames_number.value) - 1);
								cc_ctx.imageSmoothingEnabled = false;
								cc_ctx.mozImageSmoothingEnabled = false;
								cc_ctx.msImageSmoothingEnabled = false;
								cc_ctx.webkitImageSmoothingEnabled = false;
								flag_ctx_sizes_corrected = false;
							}
							cc_ctx.drawImage(this, 0, Number(this.id) * this.height - 0.024 * this.height * Number(this.id));
						};
					};
					reader.readAsDataURL(input.files[0]);
				};
				import_frame_btn.addEventListener('change', openFile);
				btns_placeholder.appendChild(import_frame_btn);
				i = i + 1;
			}
		export_comics.disabled = false;
		btns_hided = false;
	}
	else
	{
		btns_placeholder.style.visibility = 'hidden';
		btns_placeholder.style.height = '0px';
		show_upload_btns.value = 'Показать кнопки';
		cc_ctx.clearRect(0, 0, comics_canvas.width, comics_canvas.height);
		var i = btns_placeholder.childNodes.length - 1;
		while(i >= 0)
		{
			btns_placeholder.removeChild(document.getElementById("import_frame_" + i));
			i = i - 1;
		}
		export_comics.disabled = true;
		btns_hided = true;
	}
});

export_comics.addEventListener('click', function (e)
{
	cc_ctx.clearRect(0, 0, comics_canvas.width, comics_canvas.height);
	var i = 0;
	while(i < frames_number.value)
	{
		cc_ctx.drawImage(comics_images[i], 0, i * comics_images[i].height - 0.024 * comics_images[i].height * i);
		i = i + 1;
	}
	Canvas2Image.saveAsPNG(comics_canvas, comics_canvas.width, comics_canvas.height, comics_counter + '.png', smooth_enabled);
	comics_counter = comics_counter + 1;
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
*/