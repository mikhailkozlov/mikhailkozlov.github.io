---
title: Picasa Albums v1.0.6 is live on github.com
tags:
    - wordpress
    - plugin
categories:
    - Picasa Albums
excerpt: Picasa Albums v1.0.6 is on github.com and awaits for some brave souls to take a it for a test drive. New version contains fixes for Fancybox's issue submitted on github.com and thumbnail issue I found. v1.0.6 introduces 2 new features hooks and custom url.
---


Picasa Albums v1.0.6 is on github.com and awaits for some brave souls to take a it for a test drive. New version [contains fixes for Fancybox's issue](https://github.com/315design/Picasa-Albums-For-WordPress/issues/11) submitted on github.com and thumbnail issue I found. v1.0.6 introduces 2 new features [hooks](https://github.com/315design/Picasa-Albums-For-WordPress/wiki/Hooks) and custom url.

[Download v1.0.6 from github.com](https://github.com/315design/Picasa-Albums-For-WordPress/tree/v1.0.6) and/or get details after the break.

##Issues
###Fancybox

[Issue #11](https://github.com/mikhailkozlov/Picasa-Albums-For-WordPress/issues/11) describes the issue pretty well. In short Fancybox does not care about rel attributes that have multiple values set. I have looked around discussion boards and figured that the bast way would be to use data atribute to fix the problem. Unfortunately that means that plugin will run on modify version of Fancybox, but it looks like solution will make it back into the plugin and we could switch to standart version in near future. For now, you have to worry not, modifications are minor and 100% backwards compatible.

###Thumbnails

Thumbnails look odd once you install plugin, so I took a look at them. It turns out plugin was trying to set size of Google's album cover to thumbnails despite settings of the plugin. This is fix now.

##New Features
##"Hooks"

v1.0.6 adds notion of hooks. In case of Picasa Albums hooks are the functions that allow users overwrite default behavior of the plugin without hacking it. It is great for updatability and adds upgrade safe layer of customization. Right now we have only two hooks:

- wp_picasa_single_view_filter
- wp_picasa_list_view_filter
Both of them take two parameters $post and $options. $post is WordPress post object of Picasa Album and $options is current plugin settings.

###wp_picasa_single_view_filter

wp_picasa_single_view_filter hook allows you to safely overwrite default structure of the album page. You can customize the way thumbnails are styled on the page that displays single album (www.site.com/albums/albumName/). It is best to place hook function into functions.php:


	function wp_picasa_single_view_filter($post,$options)
	{
		$res = 'html';
		// your code goes here
		// function must return string
		return $res;
	}

###wp_picasa_list_view_filter

wp_picasa_list_view_filter hook allows you to control how albums are displayed on Album's page (www.site.com/albums/). It is best to place hook function into functions.php:


	function wp_picasa_list_view_filter(&$post,&$options){
		$style = ($options['album_thumbcrop'] == 'yes') ? ' width:'.$post->post_excerpt['thumbnail']['height'].'; height:'.$post->post_excerpt['thumbnail']['height'].' ':' ';
		$res = '


		post_excerpt['thumbnail']['url'],$options).''); '.$style.'">
		post_excerpt['title'].'" src="'.get_bloginfo( 'stylesheet_directory' ).'/images/thumb_frame_160.png" alt=""';
		$res .= ($options['album_thumbcrop'] == 'yes') ? ' width="'.$post->post_excerpt['thumbnail']['height'].' height="'.$post->post_excerpt['thumbnail']['height'].'" ':' ';
		$res .= ' />';
		return $res;
	}

The code above is live example form www.pashaspr.com's gallery. Right click on the site to see css.

##Custom Path

Picasa Albums v1.0.6 now lets you set custom path to the albums on settings page. Again, you do not have to hack plugin anymore to create custom url that suits your website. Please keep in mind that Permalinks have to be enabled on the blog to use this functionality. You can find this in settings section for the plugin.

##Testing
I need your help. Please get latest code from [github.com](https://github.com/315design/Picasa-Albums-For-WordPress/tree/v1.0.6) and let me know what you think in [Github's issue tracker](https://github.com/315design/Picasa-Albums-For-WordPress/issues?sort=created&direction=desc&state=closed).