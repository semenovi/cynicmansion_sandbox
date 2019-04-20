// get the elements for the gui
// getting canvases
var canvas				= document.getElementById("scr"),
	paint_bckgr_buf 	=document.getElementById('paint_bckgr_pixelate_buffer'),
	paint_buf 			= document.getElementById('paint_pixelate_buffer'),
	paint_bckgr			= document.getElementById("paint_bckgr"),
	canvas_front		= document.getElementById("scr_2"),
	paint				= document.getElementById("paint"),
	splash_c 			= document.getElementById('splash'),
	comics_canvas 		= document.createElement('canvas');
		
// getting their context
var ctx					= canvas.getContext('2d'),
	ppaint_bckgr_buf 	= paint_bckgr_buf.getContext('2d'),
	ppaint_buf 			= paint_buf.getContext('2d'),
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
	brush_color_text 	= document.getElementById("brush_color_text"),
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
	comics_export_format= document.getElementById("comics_export_format"),
	// new buttons for uploading will be spawn here
	btns_placeholder 	= document.getElementById("btns_placeholder"),
	export_comics 		= document.getElementById("export_comics");
	
// global variables for control the gui
var hided 				= false, // are gui hided?
	btns_hided 			= true, // are buttons for upload hided?
	color 				= true, // are black color using for current speech?
	brush_color 		= "#000000",
	sw 					= window.innerWidth,
	sh 					= window.innerHeight,
	number_of_npc 		= 0,	// number and counter have a differense:
								// number can be decreased
	number_of_rp 		= 0,
	number_of_layers 	= 2, // layers where does the brush work
	rp_counter 			= 0,
	id_counter 			= 0,
	frame_counter 		= 0,
	comics_counter 		= 0,
	npcs 				= new Array(), // npcs that displayed on canvas
	rps 				= new Array(), // speechs that displayed on canvas
	comics_images 		= new Array(), // speechs that displayed on canvas
	brush_layer_n 		= 1, // which canvas intended for painting now?
	timer_splash,
	scale 				= Math.min(sw / 344, sh / 215),
	lx 					= (sw - 344 * scale) / 2,
	rx 					= lx + 344 * scale,
	ty 					= 0,
	by 					= 215 * scale;

// classes definition
// a class that contains an array of Images and loads them
class image_bank
{
	constructor(id, path, number, next_bank)
	{
		this.id = id;
		this.path = path;
		this.number = number;
		this.counter = 0;
		this.bank = new Array();
		this.next_bank = next_bank;
		this.loading_status = 0;
	}
	exit_if_all_loaded()
	{
		this.counter = this.counter + 1;
		if(this.counter == this.number && this.next_bank != null)
		{
			var bank_loaded = new CustomEvent("bank_loaded",
			{
				detail:
				{
					loading_status: this.loading_status,
					next_bank: this.next_bank
				}
			});
			window.dispatchEvent(bank_loaded);
		}
		else if(this.counter == this.number && this.next_bank == null)
		{
			timer_splash = setTimeout(
finish_loading, Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000);
		}
	}
	start_loading(loading_status_before)
	{
		this.loading_status = loading_status_before + 1;
		var i = 1;
		while (i <= this.number)
		{
			this.bank[i - 1] = new Image();
			this.bank[i - 1].src = this.path + i + '.png';
			var this_link = this;
			this.bank[i - 1].onload = function()
			{
				this_link.exit_if_all_loaded();
			};
			i = i + 1;
		}
	}
}
	
// image arrays
var rl_r_bank 		= new image_bank(39, 'body/legs/reversed/r/', 10, null),

	bgrnd_bank 		= new image_bank(38, 'back_344/', 3, rl_r_bank),
	bgrnd_front_bank= new image_bank(37, 'back_344/front/', 3, bgrnd_bank),
	
	skin_bank 		= new image_bank(36, 'skins/', 12, bgrnd_front_bank),
	skin_u_bank 	= new image_bank(35, 'skins/up/', 12, skin_bank),
	skin_b_bank 	= new image_bank(34, 'skins/bottom/', 12, skin_u_bank),
	skin_r_bank 	= new image_bank(33, 'skins/reversed/', 12, skin_b_bank),
	
	body_bank 		= new image_bank(32, 'body/body/', 10, skin_r_bank),
	body_u_bank 	= new image_bank(31, 'body/body/up/', 10, body_bank),
	body_b_bank 	= new image_bank(30, 'body/body/bottom/', 10, body_u_bank),
	body_r_bank 	= new image_bank(29, 'body/body/reversed/', 10,body_b_bank),
	
	head_bank 		= new image_bank(28, 'body/head/', 5, body_r_bank),
	head_u_bank 	= new image_bank(27, 'body/head/up/', 5, head_bank),
	head_b_bank 	= new image_bank(26, 'body/head/bottom/', 5, head_u_bank),
	head_r_bank 	= new image_bank(25, 'body/head/reversed/', 5,head_b_bank),
	
	eyes_bank 		= new image_bank(24, 'body/eyes/', 6, head_r_bank),
	eyes_u_bank 	= new image_bank(23, 'body/eyes/up/', 6, eyes_bank),
	eyes_b_bank 	= new image_bank(22, 'body/eyes/bottom/', 6, eyes_u_bank),
	eyes_r_bank 	= new image_bank(21, 'body/eyes/reversed/', 6,eyes_b_bank),
	
	mouth_bank 		= new image_bank(20, 'body/mouth/', 6, eyes_r_bank),
	mouth_u_bank 	= new image_bank(19, 'body/mouth/up/', 6, mouth_bank),
	mouth_b_bank 	= new image_bank(18, 'body/mouth/bottom/', 6, mouth_u_bank),
	mouth_r_bank 	= new image_bank(17, 'body/mouth/reversed/',6,mouth_b_bank),
	
	lh_bank 		= new image_bank(16, 'body/hands/l/', 10, mouth_r_bank),
	lh_u_bank 		= new image_bank(15, 'body/hands/up/l/', 10, lh_bank),
	lh_b_bank 		= new image_bank(14, 'body/hands/bottom/l/', 10, lh_u_bank),
	lh_r_bank 		= new image_bank(13, 'body/hands/reversed/l/',10,lh_b_bank),
	
	rh_bank 		= new image_bank(12, 'body/hands/r/', 10, lh_r_bank),
	rh_u_bank 		= new image_bank(11, 'body/hands/up/r/', 10, rh_bank),
	rh_b_bank 		= new image_bank(10, 'body/hands/bottom/r/', 10,rh_u_bank),
	rh_r_bank 		= new image_bank(9, 'body/hands/reversed/r/', 10,rh_b_bank),
	
	ll_bank 		= new image_bank(8, 'body/legs/l/', 10, rh_r_bank),
	ll_u_bank 		= new image_bank(7, 'body/legs/up/l/', 10, ll_bank),
	ll_b_bank 		= new image_bank(6, 'body/legs/bottom/l/', 10, ll_u_bank),
	ll_r_bank 		= new image_bank(5, 'body/legs/reversed/l/', 10, ll_b_bank),
	
	rl_bank 		= new image_bank(4, 'body/legs/r/', 10, ll_r_bank),
	rl_u_bank 		= new image_bank(3, 'body/legs/up/r/', 10, rl_bank),
	rl_b_bank 		= new image_bank(2, 'body/legs/bottom/r/', 10, rl_u_bank),
	rl_r_bank 		= new image_bank(1, 'body/legs/reversed/r/', 10, rl_b_bank),
	
	splash_bank 	= new image_bank(0, 'splash_screen/', 8, rl_r_bank);

// a class for keep data about npc's on canvas and draw them
class npc
{
	constructor(id)
	{
		this.id 		= id;
		this.body 		= 5;
		this.head 		= 3;
		this.eyes 		= 1;
		this.mouth 		= 6;
		this.lh 		= 4;
		this.rh 		= 4;
		this.ll 		= 5;
		this.rl 		= 5;
		this.x 			= 0;
		this.y 			= 0;
		this.direction 	= 1;
		this.skin 		= 0;
	}
	redraw(ctex)
	{
		if(this.direction == 1)
		{
			ctex.drawImage(	ll_bank.bank[this.ll - 1],
							this.x, this.y,
							ll_bank.bank[this.ll - 1].width * scale,
							ll_bank.bank[this.ll - 1].height * scale);
			ctex.drawImage(	body_bank.bank[this.body - 1],
							this.x, this.y,
							body_bank.bank[this.body - 1].width * scale,
							body_bank.bank[this.body - 1].height * scale);
			ctex.drawImage(	head_bank.bank[this.head - 1],
							this.x, this.y,
							head_bank.bank[this.head - 1].width * scale,
							head_bank.bank[this.head - 1].height * scale);
			ctex.drawImage(	eyes_bank.bank[this.eyes - 1],
							this.x, this.y,
							eyes_bank.bank[this.eyes - 1].width * scale,
							eyes_bank.bank[this.eyes - 1].height * scale);
			ctex.drawImage(	mouth_bank.bank[this.mouth - 1],
							this.x, this.y,
							mouth_bank.bank[this.mouth - 1].width * scale,
							mouth_bank.bank[this.mouth - 1].height * scale);
			ctex.drawImage(	lh_bank.bank[this.lh - 1],
							this.x, this.y,
							lh_bank.bank[this.lh - 1].width * scale,
							lh_bank.bank[this.lh - 1].height * scale);
			ctex.drawImage(	rh_bank.bank[this.rh - 1],
							this.x, this.y,
							rh_bank.bank[this.rh - 1].width * scale,
							rh_bank.bank[this.rh - 1].height * scale);
			ctex.drawImage(	rl_bank.bank[this.rl - 1],
							this.x, this.y,
							rl_bank.bank[this.rl - 1].width * scale,
							rl_bank.bank[this.rl - 1].height * scale);
			if(this.skin != 0)
			{
				ctex.drawImage(	skin_bank.bank[this.skin - 1],
							this.x, this.y,
							skin_bank.bank[this.skin - 1].width * scale,
							skin_bank.bank[this.skin - 1].height * scale);
			}
		}
		else if (this.direction == 2)
		{
			ctex.drawImage(	ll_u_bank.bank[this.ll - 1],
							this.x, this.y,
							ll_u_bank.bank[this.ll - 1].width * scale,
							ll_u_bank.bank[this.ll - 1].height * scale);
			ctex.drawImage(	body_u_bank.bank[this.body - 1],
							this.x, this.y,
							body_u_bank.bank[this.body - 1].width * scale,
							body_u_bank.bank[this.body - 1].height * scale);
			ctex.drawImage(	head_u_bank.bank[this.head - 1],
							this.x, this.y,
							head_u_bank.bank[this.head - 1].width * scale,
							head_u_bank.bank[this.head - 1].height * scale);
			ctex.drawImage(	eyes_u_bank.bank[this.eyes - 1],
							this.x, this.y,
							eyes_u_bank.bank[this.eyes - 1].width * scale,
							eyes_u_bank.bank[this.eyes - 1].height * scale);
			ctex.drawImage(	mouth_u_bank.bank[this.mouth - 1],
							this.x, this.y,
							mouth_u_bank.bank[this.mouth - 1].width * scale,
							mouth_u_bank.bank[this.mouth - 1].height * scale);
			ctex.drawImage(	lh_u_bank.bank[this.lh - 1],
							this.x, this.y,
							lh_u_bank.bank[this.lh - 1].width * scale,
							lh_u_bank.bank[this.lh - 1].height * scale);
			ctex.drawImage(	rh_u_bank.bank[this.rh - 1],
							this.x, this.y,
							rh_u_bank.bank[this.rh - 1].width * scale,
							rh_u_bank.bank[this.rh - 1].height * scale);
			ctex.drawImage(	rl_u_bank.bank[this.rl - 1],
							this.x, this.y,
							rl_u_bank.bank[this.rl - 1].width * scale,
							rl_u_bank.bank[this.rl - 1].height * scale);
			if(this.skin != 0)
			{
				ctex.drawImage(	skin_u_bank.bank[this.skin - 1],
							this.x, this.y,
							skin_u_bank.bank[this.skin - 1].width * scale,
							skin_u_bank.bank[this.skin - 1].height * scale);
			}
		}
		else if (this.direction == 3)
		{
			ctex.drawImage(	ll_b_bank.bank[this.ll - 1],
							this.x, this.y,
							ll_b_bank.bank[this.ll - 1].width * scale,
							ll_b_bank.bank[this.ll - 1].height * scale);
			ctex.drawImage(	body_b_bank.bank[this.body - 1],
							this.x, this.y,
							body_b_bank.bank[this.body - 1].width * scale,
							body_b_bank.bank[this.body - 1].height * scale);
			ctex.drawImage(	head_b_bank.bank[this.head - 1],
							this.x, this.y,
							head_b_bank.bank[this.head - 1].width * scale,
							head_b_bank.bank[this.head - 1].height * scale);
			ctex.drawImage(	eyes_b_bank.bank[this.eyes - 1],
							this.x, this.y,
							eyes_b_bank.bank[this.eyes - 1].width * scale,
							eyes_b_bank.bank[this.eyes - 1].height * scale);
			ctex.drawImage(	mouth_b_bank.bank[this.mouth - 1],
							this.x, this.y,
							mouth_b_bank.bank[this.mouth - 1].width * scale,
							mouth_b_bank.bank[this.mouth - 1].height * scale);
			ctex.drawImage(	lh_b_bank.bank[this.lh - 1],
							this.x, this.y,
							lh_b_bank.bank[this.lh - 1].width * scale,
							lh_b_bank.bank[this.lh - 1].height * scale);
			ctex.drawImage(	rh_b_bank.bank[this.rh - 1],
							this.x, this.y,
							rh_b_bank.bank[this.rh - 1].width * scale,
							rh_b_bank.bank[this.rh - 1].height * scale);
			ctex.drawImage(	rl_b_bank.bank[this.rl - 1],
							this.x, this.y,
							rl_b_bank.bank[this.rl - 1].width * scale,
							rl_b_bank.bank[this.rl - 1].height * scale);
			if(this.skin != 0)
			{
				ctex.drawImage(	skin_b_bank.bank[this.skin - 1],
							this.x, this.y,
							skin_b_bank.bank[this.skin - 1].width * scale,
							skin_b_bank.bank[this.skin - 1].height * scale);
			}
		}
		else if (this.direction == 4)
		{
			ctex.drawImage(	ll_r_bank.bank[this.ll - 1],
							this.x, this.y,
							ll_r_bank.bank[this.ll - 1].width * scale,
							ll_r_bank.bank[this.ll - 1].height * scale);
			ctex.drawImage(	body_r_bank.bank[this.body - 1],
							this.x, this.y,
							body_r_bank.bank[this.body - 1].width * scale,
							body_r_bank.bank[this.body - 1].height * scale);
			ctex.drawImage(	head_r_bank.bank[this.head - 1],
							this.x, this.y,
							head_r_bank.bank[this.head - 1].width * scale,
							head_r_bank.bank[this.head - 1].height * scale);
			ctex.drawImage(	eyes_r_bank.bank[this.eyes - 1],
							this.x, this.y,
							eyes_r_bank.bank[this.eyes - 1].width * scale,
							eyes_r_bank.bank[this.eyes - 1].height * scale);
			ctex.drawImage(	mouth_r_bank.bank[this.mouth - 1],
							this.x, this.y,
							mouth_r_bank.bank[this.mouth - 1].width * scale,
							mouth_r_bank.bank[this.mouth - 1].height * scale);
			ctex.drawImage(	lh_r_bank.bank[this.lh - 1],
							this.x, this.y,
							lh_r_bank.bank[this.lh - 1].width * scale,
							lh_r_bank.bank[this.lh - 1].height * scale);
			ctex.drawImage(	rh_r_bank.bank[this.rh - 1],
							this.x, this.y,
							rh_r_bank.bank[this.rh - 1].width * scale,
							rh_r_bank.bank[this.rh - 1].height * scale);
			ctex.drawImage(	rl_r_bank.bank[this.rl - 1],
							this.x, this.y,
							rl_r_bank.bank[this.rl - 1].width * scale,
							rl_r_bank.bank[this.rl - 1].height * scale);
			if(this.skin != 0)
			{
				ctex.drawImage(	skin_r_bank.bank[this.skin - 1],
							this.x, this.y,
							skin_r_bank.bank[this.skin - 1].width * scale,
							skin_r_bank.bank[this.skin - 1].height * scale);
			}
		}
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
}

// functions definition
function canvas_sizes_init()
{
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

	paint_bckgr_buf.style.left = lx + 'px';
	paint_bckgr_buf.width = rx - lx;
	paint_bckgr_buf.height = by;

	paint_buf.style.left = lx + 'px';
	paint_buf.width = rx - lx;
	paint_buf.height = by;
}

function switch_gui(boolvar)
{
	if(boolvar)
	{
		form_container.style.visibility = 'visible';
		splash_c.style.visibility = 'hidden';
	}
	else
	{
		form_container.style.visibility = 'hidden';
		splash_c.style.visibility = 'visible';
	}
}

// buttons disabling/enabling
function switch_npc_gui(boolvar)
{
	move_npc.disabled = !boolvar;
	del_npc.disabled = !boolvar;
	skin_id.disabled = !boolvar;
	body.disabled = !boolvar;
	head.disabled = !boolvar;

	direction.disabled = !boolvar;
	eyes.disabled = !boolvar;
	mouth.disabled = !boolvar;
	lh.disabled = !boolvar;
	rh.disabled = !boolvar;
	ll.disabled = !boolvar;
	rl.disabled = !boolvar;
	x.disabled = !boolvar;
	y.disabled = !boolvar;
}

// speech disabling/enabling
function switch_rp_gui(boolvar)
{
	move_rp.disabled = !boolvar;
	del_rp.disabled = !boolvar;
	rpx.disabled = !boolvar;
	rpy.disabled = !boolvar;
	change_rp_color.disabled = !boolvar;
}

// export comics button disabling/enabling
function switch_comics_gui(boolvar)
{
	export_comics.disabled = !boolvar;
}

function start_loading(e) {
    move_splash_canvas();
	continue_loading(0, e.detail.next_bank);
	window.removeEventListener('bank_loaded', start_loading);
}

function move_splash_canvas()
{
	splash_c.style.left = '20%';
	splash_c.width = sw * 0.6 - 10;
	splash_c.height = (sw * 0.6 - 10) / 2;
	splash_c.style.top = (sh - splash_c.height) / 2 + 'px';
}

function continue_loading(loading_status, next_bank)
{
	var frame = Math.floor(loading_status * (splash_bank.number / 39));
	splash_ctx.drawImage(
splash_bank.bank[frame], 0, 0, splash_c.width, splash_c.height);
	var loading_listener = function (e)
	{
		continue_loading(e.detail.loading_status, e.detail.next_bank);
		window.removeEventListener('bank_loaded', loading_listener);
	}
	window.addEventListener('bank_loaded', loading_listener);
	next_bank.start_loading(loading_status);
}

function finish_loading()
{
	splash_ctx.drawImage(splash_bank.bank[splash_bank.number - 1],
						 0, 0, splash_c.width, splash_c.height);
	clearTimeout(timer_splash);
	
	switch_gui(true);
	
	splash_c.remove();

	// backgrounds
	i = 1;
	while(i <= bgrnd_bank.number)
	{
		var option = document.createElement("option");
		option.text = i + '';
		back_change.add(option);
		i = i + 1;
	}
	back_change.selectedIndex = 1;
	
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
	
	// skin
	i = 1;
	while(i <= skin_bank.number)
	{
		var option = document.createElement("option");
		option.text = i + '';
		skin_id.add(option);
		i = i + 1;
	}
	skin_id.selectedIndex = 0;

	// disabling
	switch_npc_gui(false);
	switch_rp_gui(false);
	switch_comics_gui(false);

	// sizes changing
	canvas_sizes_init();

	// turn on smooth
	switch_smooth(false);

	// init draw
	draw_background(ctx);
	draw_front_background(pcanvas_front);
	
	// gui init values
	x.value = 0;
	y.value = 0;
	lh.value = 1;
	rh.value = 1;
	ll.value = 1;
	rl.value = 1;
	body.value = 1;
	head.value = 1;
	eyes.value = 1;
	mouth.value = 1;
	rpx.value = 0;
	rpy.value = 0;
	rp_text.value = "";
	frames_number.value = "";
	comics_export_format.disabled = true;
}

function switch_smooth(boolvar)
{	
	ctx.imageSmoothingEnabled = boolvar;
	ctx.mozImageSmoothingEnabled = boolvar;
	ctx.msImageSmoothingEnabled = boolvar;
	ctx.webkitImageSmoothingEnabled = boolvar;
	
	ppaint_bckgr_buf.imageSmoothingEnabled = boolvar;
	ppaint_bckgr_buf.mozImageSmoothingEnabled = boolvar;
	ppaint_bckgr_buf.msImageSmoothingEnabled = boolvar;
	ppaint_bckgr_buf.webkitImageSmoothingEnabled = boolvar;
	
	ppaint_buf.imageSmoothingEnabled = boolvar;
	ppaint_buf.mozImageSmoothingEnabled = boolvar;
	ppaint_buf.msImageSmoothingEnabled = boolvar;
	ppaint_buf.webkitImageSmoothingEnabled = boolvar;
	
	pctx.imageSmoothingEnabled = boolvar;
	pctx.mozImageSmoothingEnabled = boolvar;
	pctx.msImageSmoothingEnabled = boolvar;
	pctx.webkitImageSmoothingEnabled = boolvar;
	
	ppaint_bckgr.imageSmoothingEnabled = boolvar;
	ppaint_bckgr.mozImageSmoothingEnabled = boolvar;
	ppaint_bckgr.msImageSmoothingEnabled = boolvar;
	ppaint_bckgr.webkitImageSmoothingEnabled = boolvar;
	
	pcanvas_front.imageSmoothingEnabled = boolvar;
	pcanvas_front.mozImageSmoothingEnabled = boolvar;
	pcanvas_front.msImageSmoothingEnabled = boolvar;
	pcanvas_front.webkitImageSmoothingEnabled = boolvar;
}

function draw_background(ctex)
{
	ctex.drawImage(bgrnd_bank.bank[back_change.selectedIndex - 1],
				   0, 0, canvas.width, canvas.height);
}

function draw_front_background(ctex)
{
	ctex.drawImage(bgrnd_front_bank.bank[back_change.selectedIndex - 1],
				   0, 0, canvas.width, canvas.height);
}

// thx for idea: https://stackoverflow.com/a/19129822
function pixelate(dest_canvas, buf_canvas, dest_ctx, buf_ctx, pixel_size)
{
	// get a block size
	var w = dest_canvas.width * pixel_size,
		h = dest_canvas.height * pixel_size;
	
	// draw the original image at a fraction of the final size
	buf_ctx.drawImage(dest_canvas, 0, 0, w, h);

	// enlarge the minimized image to full size    
	dest_ctx.drawImage(buf_canvas, 0, 0, w, h, 0, 0,
						  dest_canvas.width, dest_canvas.height);
}

// render function called every time when
// the image on the canvas must be updated
function render()
{
	// layer 0
	draw_background(ctx);
	
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
	draw_front_background(pcanvas_front);
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

// GUI init
/*
// stupid try to rendering when its really needs
form_container.addEventListener('mousemove', function(event)
{
	
	render();
});
*/

// loading
window.addEventListener('bank_loaded', start_loading);
splash_bank.start_loading(0);

// Description of the interactive part of the gui (EventListeners)

hide_button.addEventListener('click', function(event)
{
	if(hided)
	{
		form_container.style.height = '90%';
		gui_form.style.overflowY = 'auto';
		hide_button.value = 'Свернуть';
		container_hiding.style.visibility = 'visible';
		hided = false;
	}
	else
	{
		form_container.style.height = '47px';
		gui_form.style.overflowY = 'hidden';
		hide_button.value = 'Показать';
		container_hiding.style.visibility = 'hidden';
		hided = true;
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
	npcs[number_of_npc - 1].x = 90 * scale;
	npcs[number_of_npc - 1].y = 60 * scale;
	render();
	
	// updating all gui to the default values
	npc_id.selectedIndex = npc_id.length - 1;
	switch_npc_gui(true);
	x.value = (npcs[npc_id.selectedIndex - 1].x + 27 * scale) / (scale * 3.05);
	y.value = (npcs[npc_id.selectedIndex - 1].y + 22 * scale) / (scale * 1.26);
	lh.value = npcs[npc_id.selectedIndex - 1].lh;
	rh.value = npcs[npc_id.selectedIndex - 1].rh;
	ll.value = npcs[npc_id.selectedIndex - 1].ll;
	rl.value = npcs[npc_id.selectedIndex - 1].rl;
	body.value = npcs[npc_id.selectedIndex - 1].body;
	head.value = npcs[npc_id.selectedIndex - 1].head;
	eyes.value = npcs[npc_id.selectedIndex - 1].eyes;
	mouth.value = npcs[npc_id.selectedIndex - 1].mouth;
	direction.value = npcs[npc_id.selectedIndex - 1].direction;
});

npc_id.addEventListener('input', function(event)
{
	// here and every next time "if" checks what option selected in list
	if(npc_id.selectedIndex > 0)
	{
		// updating all gui to the actual values
		x.value =
(npcs[npc_id.selectedIndex - 1].x + 27 * scale) / (scale * 3.05);
		y.value =
(npcs[npc_id.selectedIndex - 1].y + 22 * scale) / (scale * 1.26);
		lh.value = npcs[npc_id.selectedIndex - 1].lh;
		rh.value = npcs[npc_id.selectedIndex - 1].rh;
		ll.value = npcs[npc_id.selectedIndex - 1].ll;
		rl.value = npcs[npc_id.selectedIndex - 1].rl;
		body.value = npcs[npc_id.selectedIndex - 1].body;
		head.value = npcs[npc_id.selectedIndex - 1].head;
		eyes.value = npcs[npc_id.selectedIndex - 1].eyes;
		mouth.value = npcs[npc_id.selectedIndex - 1].mouth;
		switch_npc_gui(true);
	}
	else
	{
		x.value = 0;
		y.value = 0;
		lh.value = 1;
		rh.value = 1;
		ll.value = 1;
		rl.value = 1;
		body.value = 1;
		head.value = 1;
		eyes.value = 1;
		mouth.value = 1;
		move_npc.value = "Двигать";
		switch_npc_gui(false);
		cmoving = false;
	}
});

var npc_mouse = { x:0, y:0 };
var npc_delta = { x:0, y:0 };
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
			var x_val = 0, y_val = 0,
				drc = npcs[npc_id.selectedIndex - 1].direction;
			if (drc == 2 || drc == 3)
			{
				x_val = (
npcs[npc_id.selectedIndex - 1].x + npc_delta.x + 27 * scale) / (scale * 2.55);
				y_val = (
npcs[npc_id.selectedIndex - 1].y + npc_delta.y + 22 * scale) / (scale * 1.74);
			}
			else
			{
				x_val = (
npcs[npc_id.selectedIndex - 1].x + npc_delta.x + 27 * scale) / (scale * 3.05);
				y_val = (
npcs[npc_id.selectedIndex - 1].y + npc_delta.y + 22 * scale) / (scale * 1.26);
			}
			
			if (x_val > 0 && x_val < 100 && y_val > 0 && y_val < 100)
			{
				npc_delta.x = e.pageX - this.offsetLeft - npc_mouse.x;
				npc_delta.y = e.pageY - this.offsetTop - npc_mouse.y;
				npcs[npc_id.selectedIndex - 1].x
				= npcs[npc_id.selectedIndex - 1].x + npc_delta.x;
				npcs[npc_id.selectedIndex - 1].y
				= npcs[npc_id.selectedIndex - 1].y + npc_delta.y;
				render();
				npc_mouse.x = e.pageX - this.offsetLeft;
				npc_mouse.y = e.pageY - this.offsetTop;
				x.value = x_val;
				y.value = y_val;
			}
			else
			{
				npcs[npc_id.selectedIndex - 1].x
				= npcs[npc_id.selectedIndex - 1].x - npc_delta.x;
				npcs[npc_id.selectedIndex - 1].y
				= npcs[npc_id.selectedIndex - 1].y - npc_delta.y;
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
		switch_npc_gui(false);
		cmoving = false;
	}
});

skin_id.addEventListener('input', function(event)
{
	npcs[npc_id.selectedIndex - 1].skin = skin_id.selectedIndex;
	render();
});

body.addEventListener('input', function(event)
{
	if(npc_id.selectedIndex > 0)
	{
		npcs[npc_id.selectedIndex - 1].body = body.value;
		render();
	}
});

head.addEventListener('input', function(event)
{
	if(npc_id.selectedIndex > 0)
	{
		npcs[npc_id.selectedIndex - 1].head = head.value;
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
		var drc = npcs[npc_id.selectedIndex - 1].direction;
		if (drc == 2 || drc == 3)
		{
			npcs[npc_id.selectedIndex - 1].x
= Number(x.value) * scale * 2.55 - 27 * scale;
		}
		else
		{
			npcs[npc_id.selectedIndex - 1].x
= Number(x.value) * scale * 3.05 - 27 * scale;
		}
		render();
	}
});

y.addEventListener('input', function(event)
{
	if(npc_id.selectedIndex > 0)
	{
		var drc = npcs[npc_id.selectedIndex - 1].direction;
		if (drc == 2 || drc == 3)
		{
			npcs[npc_id.selectedIndex - 1].y
= Number(y.value) * scale * 1.74 - 22 * scale;
		}
		else
		{
			npcs[npc_id.selectedIndex - 1].y
= Number(y.value) * scale * 1.26 - 22 * scale;
		}
		render();
	}
});

direction.addEventListener('input', function(event)
{
	if(npc_id.selectedIndex > 0)
	{
		npcs[npc_id.selectedIndex - 1].direction = Number(direction.value);
		render();
	}
});

eyes.addEventListener('input', function(event)
{
	if(npc_id.selectedIndex > 0)
	{
		npcs[npc_id.selectedIndex - 1].eyes = Number(eyes.value);
		render();
	}
});

mouth.addEventListener('input', function(event)
{
	if(npc_id.selectedIndex > 0)
	{
		npcs[npc_id.selectedIndex - 1].mouth = Number(mouth.value);
		render();
	}
});

lh.addEventListener('input', function(event)
{
	if(npc_id.selectedIndex > 0)
	{
		npcs[npc_id.selectedIndex - 1].lh = Number(lh.value);
		render();
	}
});

rh.addEventListener('input', function(event)
{
	if(npc_id.selectedIndex > 0)
	{
		npcs[npc_id.selectedIndex - 1].rh = Number(rh.value);
		render();
	}
});

ll.addEventListener('input', function(event)
{
	if(npc_id.selectedIndex > 0)
	{
		npcs[npc_id.selectedIndex - 1].ll = Number(ll.value);
		render();
	}
});

rl.addEventListener('input', function(event)
{
	if(npc_id.selectedIndex > 0)
	{
		npcs[npc_id.selectedIndex - 1].rl = Number(rl.value);
		render();
	}
});

// ----------------------------------------------------------------------------
// BACKGROUND
// ----------------------------------------------------------------------------

back_change.addEventListener('input', function(event)
{
	if(back_change.selectedIndex > 0)
	{
		render();
	}
});

// ----------------------------------------------------------------------------
// MODIFICATIONS
// ----------------------------------------------------------------------------

smooth.addEventListener('click', function (e)
{
	if (smooth.value == 'Выключить сглаживание')
	{
		smooth.value = 'Включить сглаживание';
		switch_smooth(false);
	}
	else
	{
		smooth.value = 'Выключить сглаживание';
		switch_smooth(true);
	}
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
			ppaint_bckgr.strokeStyle = brush_color;
			ppaint_bckgr.beginPath();
			ppaint_bckgr.moveTo(paint_mouse.x, paint_mouse.y);
			ppaint_bckgr.lineWidth = 2 * scale;
		}
		else if (brush_layer_n == 2)
		{
			paint_mouse.x = e.pageX - this.offsetLeft;
			paint_mouse.y = e.pageY - this.offsetTop;
			draw = true;
			pctx.strokeStyle = brush_color;
			pctx.beginPath();
			pctx.moveTo(paint_mouse.x, paint_mouse.y);
			pctx.lineWidth = 2 * scale;
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
				pixelate(paint_bckgr, paint_buf,
						 ppaint_bckgr, ppaint_buf, 0.3);
			}
		}
		else if (brush_layer_n == 2)
		{
			if(draw==true){
				paint_mouse.x = e.pageX - this.offsetLeft;
				paint_mouse.y = e.pageY - this.offsetTop;
				pctx.lineTo(paint_mouse.x, paint_mouse.y);
				pctx.stroke();
				pixelate(paint, paint_bckgr_buf,
						 pctx, ppaint_bckgr_buf, 0.1);
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
	brush_color = "#" + brush_color_text.value;
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

// ----------------------------------------------------------------------------
// RP EDITOR
// ----------------------------------------------------------------------------

add_rp.addEventListener('click', function(event)
{
	// updating counters
	number_of_rp = number_of_rp + 1;
	rp_counter = rp_counter + 1;
	
	// updating array of rp
	var nrp = new rp(rp_text.value,
					 Number(rpx.value) * scale * 3.30,
					 Number(rpy.value) * scale * 1.96 + 13 * scale,
					 color);
	rps[number_of_rp - 1] = nrp;
	
	// draw new rp
	render();
	
	// updating list of rp on a gui
	var option = document.createElement("option");
	option.text = '' + rp_counter;
	rp_id.add(option);
	
	// updating all gui to the default values
	rp_id.selectedIndex = rp_id.length - 1;
	switch_rp_gui(true);
	rpx.value = (rps[rp_id.selectedIndex - 1].x) / (scale * 3.30);
	rpy.value
= (rps[rp_id.selectedIndex - 1].y - 13 * scale) / (scale * 1.96);
	
});

rp_id.addEventListener('input', function(event)
{
	if(rp_id.selectedIndex > 0)
	{
		// updating all gui to the actual values
		rpx.value = (rps[rp_id.selectedIndex - 1].x) / (scale * 3.30);
		rpy.value
= (rps[rp_id.selectedIndex - 1].y - 13 * scale) / (scale * 1.96);
		switch_rp_gui(true);
	}
	else
	{
		rpx.value = 0;
		rpy.value = 0;
		move_rp.value = "Двигать";
		switch_rp_gui(false);
		rp_cmoving = false;
	}
});

rp_text.addEventListener('input', function(event)
{
	if(rp_id.selectedIndex > 0)
	{
		rps[rp_id.selectedIndex - 1].text = rp_text.value;
		render();
	}
});

del_rp.addEventListener('click', function(event)
{
	if(rp_id.selectedIndex > 0)
	{
		// updating array
		rps.splice(rp_id.selectedIndex - 1, 1);
		
		// updating list
		rp_id.remove(rp_id.selectedIndex);
		rp_id.selectedIndex = 0;
		
		// decreasing a number, not a counter
		number_of_rp = number_of_rp - 1;
		
		render();
		
		move_rp.value = "Двигать";
		switch_rp_gui(false);
		rp_cmoving = false;
	}
});

rpx.addEventListener('input', function(event)
{
	if(rp_id.selectedIndex > 0)
	{
		rps[rp_id.selectedIndex - 1].x = Number(rpx.value) * scale * 3.30;
		render();
	}
});

rpy.addEventListener('input', function(event)
{
	if(rp_id.selectedIndex > 0)
	{
		rps[rp_id.selectedIndex - 1].y
= Number(rpy.value) * scale * 1.96 + 13 * scale;
		render();
	}
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
		move_rp.value = "Двигать";
		rp_cmoving = false;
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
			y_val
= (rps[rp_id.selectedIndex - 1].y - 13 * scale) / (scale * 1.96);
			
			if (x_val >= 0 && x_val <= 100 && y_val >= 0 && y_val <= 100)
			{
				rp_delta.x = e.pageX - this.offsetLeft - rp_mouse.x;
				rp_delta.y = e.pageY - this.offsetTop - rp_mouse.y;
				rps[rp_id.selectedIndex - 1].x
= rps[rp_id.selectedIndex - 1].x + rp_delta.x;
				rps[rp_id.selectedIndex - 1].y
= rps[rp_id.selectedIndex - 1].y + rp_delta.y;
				render();
				rp_mouse.x = e.pageX - this.offsetLeft;
				rp_mouse.y = e.pageY - this.offsetTop;
				rpx.value = x_val;
				rpy.value = y_val;
			}
			else
			{
				rps[rp_id.selectedIndex - 1].x
= rps[rp_id.selectedIndex - 1].x - rp_delta.x;
				rps[rp_id.selectedIndex - 1].y
= rps[rp_id.selectedIndex - 1].y - rp_delta.y;
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

change_rp_color.addEventListener('click', function(event)
{
	if(rp_id.selectedIndex > 0)
	{
		rps[rp_id.selectedIndex - 1].color
= !rps[rp_id.selectedIndex - 1].color;
		color = !color;
		
		render();
	}
	else
	{
		color = !color;
	}
});

// ----------------------------------------------------------------------------
// EXPORT FRAME
// ----------------------------------------------------------------------------

export_png.addEventListener('click', function (e)
{
	var smooth_enabled = (smooth.value == 'Выключить сглаживание');
	
	frame_counter = frame_counter + 1;
	
	// merge layers
	ctx.drawImage(paint_bckgr, 0, 0);
	ctx.drawImage(canvas_front, 0, 0);
	ctx.drawImage(paint, 0, 0);
	
    Canvas2Image.saveAsPNG(
canvas, ctx.width, ctx.height, frame_counter + '.png', smooth_enabled);
});

// ----------------------------------------------------------------------------
// CREATE COMICS
// ----------------------------------------------------------------------------

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
								comics_canvas.height = this.height * Number(
frames_number.value) - 0.024 * this.height * (Number(frames_number.value) - 1);
								cc_ctx.imageSmoothingEnabled = false;
								cc_ctx.mozImageSmoothingEnabled = false;
								cc_ctx.msImageSmoothingEnabled = false;
								cc_ctx.webkitImageSmoothingEnabled = false;
								flag_ctx_sizes_corrected = false;
							}
							cc_ctx.drawImage(
this, 0, Number(this.id) * this.height - 0.024* this.height * Number(this.id));
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
			btns_placeholder.removeChild(
document.getElementById("import_frame_" + i));
			i = i - 1;
		}
		export_comics.disabled = true;
		btns_hided = true;
	}
});

export_comics.addEventListener('click', function (e)
{
	var smooth_enabled = (smooth.value == 'Выключить сглаживание');
	
	cc_ctx.clearRect(0, 0, comics_canvas.width, comics_canvas.height);
	var i = 0;
	while(i < frames_number.value)
	{
		cc_ctx.drawImage(
comics_images[i],
0,
i * comics_images[i].height - 0.024 * comics_images[i].height * i);
		i = i + 1;
	}
	Canvas2Image.saveAsPNG(
							comics_canvas,
							comics_canvas.width,
							comics_canvas.height,
							comics_counter + '.png',
							smooth_enabled
						  );
	comics_counter = comics_counter + 1;
});