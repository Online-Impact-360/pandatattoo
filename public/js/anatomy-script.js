

// public/scripts/my-script.js
(() => {
	"use strict";

	const ffb_config = {
		/*==============================================================================*/
		/*==============================================================================*/
		/*================ !!! CUSTOMIZATION OF THE FRONT SIDE !!!  ====================*/
		/*==============================================================================*/
		/*==============================================================================*/
		"ffb_1": { //head
			"hover": "HEAD",
			"url": "",
			"target": "none",
			"active": true
		},
		"ffb_2": { //neck
			"hover": "NECK",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_3": { //chest
			"hover": "CHEST",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_4": { //breasts
			"hover": "BREASTS",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_5": { //abdomen
			"hover": "ABDOMEN",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_6": { //pelvis
			"hover": "PELVIS",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_7": { //shoulder-rt
			"hover": "SHOULDER (RIGHT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_8": { //shoulder-lt
			"hover": "SHOULDER (LEFT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_9": { //arm-rt
			"hover": "ARM (RIGHT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_10": { //arm-lt
			"hover": "ARM (LEFT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_11": { //elbow-rt
			"hover": "ELBOW (RIGHT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_12": { //elbow-lt
			"hover": "ELBOW (LEFT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_13": { //forearm-rt
			"hover": "FOREARM (RIGHT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_14": { //forearm-lt
			"hover": "FOREARM (LEFT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_15": { //wrist-rt
			"hover": "WRIST (RIGHT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_16": { //wrist-lt
			"hover": "WRIST (LEFT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_17": { //hand-rt
			"hover": "PALM (RIGHT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_18": { //hand-lt
			"hover": "PALM (LEFT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_19": { //thigh-rt
			"hover": "THIGH (RIGHT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_20": { //thigh-lt
			"hover": "THIGH (LEFT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_21": { //knee-rt
			"hover": "KNEE (RIGHT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_22": { //knee-lt
			"hover": "KNEE (LEFT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_23": { //leg-rt
			"hover": "LEG (RIGHT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_24": { //leg-lt
			"hover": "LEG (LEFT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_25": { //ankle-rt
			"hover": "ANKLE (RIGHT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_26": { //ankle-lt
			"hover": "ANKLE (LEFT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_27": { //foot-rt
			"hover": "FOOT (RIGHT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_28": { //foot-lt
			"hover": "FOOT (LEFT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		/*===============================================================================*/
		/*===============================================================================*/
		/*================  !!! CUSTOMIZATION OF THE BACK SIDE !!!  =====================*/
		/*===============================================================================*/
		/*===============================================================================*/
		"ffb_29": { //head-back
			"hover": "HEAD [BACK]",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_30": { //neck-back
			"hover": "NECK [BACK]",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_31": { //back
			"hover": "BACK",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_32": { //loin
			"hover": "LOIN",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_33": { //buttocks
			"hover": "BUTTOCKS",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_34": { //shoulder-back-rt
			"hover": "SHOULDER [BACK] (RIGHT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_35": { //shoulder-back-lt
			"hover": "SHOULDER [BACK] (LEFT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_36": { //arm-back-rt
			"hover": "ARM [BACK] (RIGHT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_37": { //arm-back-lt
			"hover": "ARM [BACK] (LEFT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_38": { //elbow-back-rt
			"hover": "ELBOW [BACK] (RIGHT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_39": { //elbow-back-lt
			"hover": "ELBOW [BACK] (LEFT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_40": { //forearm-back-rt
			"hover": "FOREARM [BACK] (RIGHT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_41": { //forearm-back-lt
			"hover": "FOREARM [BACK] (LEFT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_42": { //wrist-back-rt
			"hover": "WRIST [BACK] (RIGHT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_43": { //wrist-back-lt
			"hover": "WRIST [BACK] (LEFT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_44": { //hand-back-rt
			"hover": "HAND [BACK] (RIGHT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_45": { //hand-back-lt
			"hover": "HAND [BACK] (LEFT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_46": { //hamstring-rt
			"hover": "HAMSTRING (RIGHT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_47": { //hamstring-lt
			"hover": "HAMSTRING (LEFT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_48": { //knee-back-rt
			"hover": "KNEE [BACK] (RIGHT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_49": { //knee-back-lt
			"hover": "KNEE [BACK] (LEFT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_50": { //calf-rt
			"hover": "CALF (RIGHT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_51": { //calf-lt
			"hover": "CALF (LEFT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_52": { //ankle-back-rt
			"hover": "ANKLE [BACK] (RIGHT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_53": { //ankle-back-lt
			"hover": "ANKLE [BACK] (LEFT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_54": { //sole-rt
			"hover": "SOLE (RIGHT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_55": { //sole-lt
			"hover": "SOLE (LEFT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_56": { //foot-back-rt
			"hover": "FOOT [BACK] (RIGHT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_57": { //foot-back-lt
			"hover": "FOOT [BACK] (LEFT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_58": {
			"hover": "LEFT KNUCKLES",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_59": {
			"hover": "RIGHT KNUCKLES",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_60": {
			"hover": "LEFT RIB",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_61": {
			"hover": "RIGHT RIB",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_62": {
			"hover": "LEFT ARM SLEEVE",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_63": {
			"hover": "RIGHT ARM SLEEVE",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_64": {
			"hover": "LEFT LEG SLEEVE",
			"url": "",
			"target": "_self",
			"active": true
		},
		"ffb_65": {
			"hover": "RIGHT LEG SLEEVE",
			"url": "",
			"target": "_self",
			"active": true
		}
	};
		
		
		
	const mfb_config = {
		/*==============================================================================*/
		/*==============================================================================*/
		/*================ !!! CUSTOMIZATION OF THE FRONT VIEW !!!  ====================*/
		/*==============================================================================*/
		/*==============================================================================*/
		"mfb_1": { //head
			"hover": "HEAD",
			"url": "",
			"target": "none",
			"active": true
		},
		"mfb_2": { //neck
			"hover": "NECK",
			"url": "",
			"target": "none",
			"active": true
		},
		"mfb_3": { //chest
			"hover": "CHEST",
			"url": "",
			"target": "none",
			"active": true
		},
		"mfb_4": { //abdomen
			"hover": "ABDOMEN",
			"url": "",
			"target": "none",
			"active": true
		},
		"mfb_5": { //pelvis
			"hover": "PELVIS",
			"url": "",
			"target": "none",
			"active": true
		},
		"mfb_6": { //shoulder-rt
			"hover": "SHOULDER (RIGHT)",
			"url": "",
			"target": "none",
			"active": true
		},
		"mfb_7": { //shoulder-lt
			"hover": "SHOULDER (LEFT)",
			"url": "",
			"target": "none",
			"active": true
		},
		"mfb_8": { //arm-rt
			"hover": "ARM (RIGHT)",
			"url": "",
			"target": "none",
			"active": true
		},
		"mfb_9": { //arm-lt
			"hover": "ARM (LEFT)",
			"url": "",
			"target": "none",
			"active": true
		},
		"mfb_10": { //elbow-rt
			"hover": "ELBOW (RIGHT)",
			"url": "",
			"target": "none",
			"active": true
		},
		"mfb_11": { //elbow-lt
			"hover": "ELBOW (LEFT)",
			"url": "",
			"target": "none",
			"active": true
		},
		"mfb_12": { //forearm-rt
			"hover": "FOREARM (RIGHT)",
			"url": "",
			"target": "none",
			"active": true
		},
		"mfb_13": { //forearm-lt
			"hover": "FOREARM (LEFT)",
			"url": "",
			"target": "none",
			"active": true
		},
		"mfb_14": { //wrist-rt
			"hover": "WRIST (RIGHT)",
			"url": "",
			"target": "none",
			"active": true
		},
		"mfb_15": { //wrist-lt
			"hover": "WRIST (LEFT)",
			"url": "",
			"target": "none",
			"active": true
		},
		"mfb_16": { //hand-rt
			"hover": "PALM (RIGHT)",
			"url": "",
			"target": "none",
			"active": true
		},
		"mfb_17": { //hand-lt
			"hover": "PALM (LEFT)",
			"url": "",
			"target": "none",
			"active": true
		},
		"mfb_18": { //thigh-rt
			"hover": "THIGH (RIGHT)",
			"url": "",
			"target": "none",
			"active": true
		},
		"mfb_19": { //thigh-lt
			"hover": "THIGH (LEFT)",
			"url": "",
			"target": "none",
			"active": true
		},
		"mfb_20": { //knee-rt
			"hover": "KNEE (RIGHT)",
			"url": "",
			"target": "none",
			"active": true
		},
		"mfb_21": { //knee-lt
			"hover": "KNEE (LEFT)",
			"url": "",
			"target": "none",
			"active": true
		},
		"mfb_22": { //leg-rt
			"hover": "LEG (RIGHT)",
			"url": "",
			"target": "none",
			"active": true
		},
		"mfb_23": { //leg-lt
			"hover": "LEG (LEFT)",
			"url": "",
			"target": "none",
			"active": true
		},
		"mfb_24": { //ankle-rt
			"hover": "ANKLE (RIGHT)",
			"url": "",
			"target": "none",
			"active": true
		},
		"mfb_25": { //ankle-lt
			"hover": "ANKLE (LEFT)",
			"url": "",
			"target": "none",
			"active": true
		},
		"mfb_26": { //foot-rt
			"hover": "FOOT (RIGHT)",
			"url": "",
			"target": "none",
			"active": true
		},
		"mfb_27": { //foot-lt
			"hover": "FOOT (LEFT)",
			"url": "",
			"target": "none",
			"active": true
		},
		/*==============================================================================*/
		/*==============================================================================*/
		/*================  !!! CUSTOMIZATION OF THE BACK VIEW !!!  ====================*/
		/*==============================================================================*/
		/*==============================================================================*/
		"mfb_28": { //head-back
			"hover": "HEAD [BACK]",
			"url": "",
			"target": "_self",
			"active": true
		},
		"mfb_29": { //neck-back
			"hover": "NECK [BACK]",
			"url": "",
			"target": "_self",
			"active": true
		},
		"mfb_30": { //back
			"hover": "BACK",
			"url": "",
			"target": "_self",
			"active": true
		},
		"mfb_31": { //loin
			"hover": "LOIN",
			"url": "",
			"target": "_self",
			"active": true
		},
		"mfb_32": { //buttocks
			"hover": "BUTTOCKS",
			"url": "",
			"target": "_self",
			"active": true
		},
		"mfb_33": { //shoulder-back-rt
			"hover": "SHOULDER [BACK] (RIGHT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"mfb_34": { //shoulder-back-lt
			"hover": "SHOULDER [BACK] (LEFT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"mfb_35": { //arm-back-rt
			"hover": "ARM [BACK] (RIGHT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"mfb_36": { //arm-back-lt
			"hover": "ARM [BACK] (LEFT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"mfb_37": { //elbow-back-rt
			"hover": "ELBOW [BACK] (RIGHT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"mfb_38": { //elbow-back-lt
			"hover": "ELBOW [BACK] (LEFT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"mfb_39": { //forearm-back-rt
			"hover": "FOREARM [BACK] (RIGHT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"mfb_40": { //forearm-back-lt
			"hover": "FOREARM [BACK] (LEFT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"mfb_41": { //wrist-back-rt
			"hover": "WRIST [BACK] (RIGHT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"mfb_42": { //wrist-back-lt
			"hover": "WRIST [BACK] (LEFT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"mfb_43": { //hand-back-rt
			"hover": "HAND [BACK] (RIGHT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"mfb_44": { //hand-back-lt
			"hover": "HAND [BACK] (LEFT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"mfb_45": { //hamstring-rt
			"hover": "HAMSTRING (RIGHT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"mfb_46": { //hamstring-lt
			"hover": "HAMSTRING (LEFT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"mfb_47": { //knee-back-rt
			"hover": "KNEE [BACK] (RIGHT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"mfb_48": { //knee-back-lt
			"hover": "KNEE [BACK] (LEFT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"mfb_49": { //calf-rt
			"hover": "CALF (RIGHT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"mfb_50": { //calf-lt
			"hover": "CALF (LEFT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"mfb_51": { //ankle-back-rt
			"hover": "ANKLE [BACK] (RIGHT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"mfb_52": { //ankle-back-lt
			"hover": "ANKLE [BACK] (LEFT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"mfb_53": { //sole-rt
			"hover": "SOLE (RIGHT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"mfb_54": { //sole-lt
			"hover": "SOLE (LEFT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"mfb_55": { //foot-back-rt
			"hover": "FOOT [BACK] (RIGHT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"mfb_56": { //foot-back-lt
			"hover": "FOOT [BACK] (LEFT)",
			"url": "",
			"target": "_self",
			"active": true
		},
		"mfb_57": {
			"hover": "LEFT KNUCKLES",
			"url": "",
			"target": "_self",
			"active": true
		},
		"mfb_58": {
			"hover": "RIGHT KNUCKLES",
			"url": "",
			"target": "_self",
			"active": true
		},
		"mfb_59": {
			"hover": "LEFT RIB",
			"url": "",
			"target": "_self",
			"active": true
		},
		"mfb_60": {
			"hover": "RIGHT RIB",
			"url": "",
			"target": "_self",
			"active": true
		},
		"mfb_61": {
			"hover": "LEFT ARM SLEEVE",
			"url": "",
			"target": "_self",
			"active": true
		},
		"mfb_62": {
			"hover": "RIGHT ARM SLEEVE",
			"url": "",
			"target": "_self",
			"active": true
		},
		"mfb_63": {
			"hover": "LEFT LEG SLEEVE",
			"url": "",
			"target": "_self",
			"active": true
		},
		"mfb_64": {
			"hover": "RIGHT LEG SLEEVE",
			"url": "",
			"target": "_self",
			"active": true
		}
	};
  
	const init = () => {
		document.querySelectorAll('path[id^="mfb_"], path[id^="ffb_"]').forEach((element, index) => {
			addEvent(element.getAttribute('id'));
		});

	};

	const isTouchEnabled = () => {
		return (('ontouchstart' in window)
			|| (navigator.MaxTouchPoints > 0)
			|| (navigator.msMaxTouchPoints > 0));
	}

	const addEvent = (id, relationId) => {
		const _obj = document.querySelector(`#${id}`);
		if (!_obj) return; // Exit if element doesn't exist

		const wrapper = document.querySelector("#mfb-wrapper");
		if (wrapper) wrapper.style.opacity = "1";
	
		// Set initial SVG attributes
		_obj.setAttribute("fill", "rgba(255, 0, 0, 0)");
		_obj.setAttribute("stroke", "rgba(255, 102, 102, 1)");
		_obj.style.cursor = "default";
	
		if (mfb_config[id]?.["active"] === true) {
			if (isTouchEnabled()) {
				let touchmoved = false;
	
				_obj.addEventListener("touchstart", () => {
					touchmoved = false;
				});
	
				_obj.addEventListener("touchmove", () => {
					touchmoved = true;
				});
	
				_obj.addEventListener("touchend", (e) => {
					if (!touchmoved) {
						const touch = e.touches[0] || e.changedTouches[0];
						let x = touch.pageX - 10;
						let y = touch.pageY - 15;
	
						const tip = document.querySelector("#tip-mfb");
						if (!tip) return;
	
						const tipWidth = tip.offsetWidth || 100;
						const tipHeight = tip.offsetHeight || 50;
	
						x = (x + tipWidth > window.scrollX + window.innerWidth) 
							? x - tipWidth - 40 
							: x;
						y = (y + tipHeight > window.scrollY + window.innerHeight) 
							? window.scrollY + window.innerHeight - tipHeight - 10 
							: y;
	
						if (mfb_config[id]["target"] !== "none") {
							_obj.style.fill = "rgba(255, 0, 0, 0.7)";
						}
						tip.style.display = "block";
						tip.innerHTML = mfb_config[id]["hover"];
						tip.style.left = `${x}px`;
						tip.style.top = `${y}px`;
	
						// Handle touchend for navigation
						_obj.addEventListener("touchend", () => {
							_obj.style.fill = "rgba(255, 0, 0, 0)";
							// if (mfb_config[id]["target"] === "_blank") {
							// 	window.open(mfb_config[id]["url"]);
							// } else if (mfb_config[id]["target"] === "_self") {
							// 	window.parent.location.href = mfb_config[id]["url"];
							// }
							tip.style.display = "none";
						}, { once: true });
					}
				});
			}
	
			_obj.style.cursor = "pointer";
	
			// Mouse events
			_obj.addEventListener("mouseenter", () => {
				const tip = document.querySelector("#tip-mfb");
				if (!tip) return;
	
				tip.style.display = "block";
				tip.innerHTML = mfb_config[id]["hover"];
				_obj.style.fill = "rgba(255, 0, 0, 0.3)";
			});
	
			_obj.addEventListener("mouseleave", () => {
				const tip = document.querySelector("#tip-mfb");
				if (!tip) return;
	
				tip.style.display = "none";
				_obj.style.fill = "rgba(255, 0, 0, 0)";
			});
	
			if (mfb_config[id]["target"] !== "none") {
				_obj.addEventListener("mousedown", () => {
					_obj.style.fill = "rgba(255, 0, 0, 0.7)";
				});
			}
	
			_obj.addEventListener("mouseup", () => {
				_obj.style.fill = "rgba(255, 0, 0, 0.3)";
				// if (mfb_config[id]["target"] === "_blank") {
				// 	window.open(mfb_config[id]["url"]);
				// } else if (mfb_config[id]["target"] === "_self") {
				// 	window.parent.location.href = mfb_config[id]["url"];
				// }
			});
	
			_obj.addEventListener("mousemove", (e) => {
				let x = e.pageX + 10;
				let y = e.pageY + 15;
	
				const tip = document.querySelector("#tip-mfb");
				if (!tip) return;
	
				const tipWidth = tip.offsetWidth || 100;
				const tipHeight = tip.offsetHeight || 50;
	
				x = (x + tipWidth > window.scrollX + window.innerWidth) 
					? x - tipWidth - 40 
					: x;
				y = (y + tipHeight > window.scrollY + window.innerHeight) 
					? window.scrollY + window.innerHeight - tipHeight - 10 
					: y;
	
				tip.style.left = `${x}px`;
				tip.style.top = `${y}px`;
			});
		} else if (ffb_config[id]?.["active"] === true) {
			if (isTouchEnabled()) {
				let touchmoved = false;
	
				_obj.addEventListener("touchstart", () => {
					touchmoved = false;
				});
	
				_obj.addEventListener("touchmove", () => {
					touchmoved = true;
				});
	
				_obj.addEventListener("touchend", (e) => {
					if (!touchmoved) {
						const touch = e.touches[0] || e.changedTouches[0];
						let x = touch.pageX - 10;
						let y = touch.pageY - 15;
	
						const tip = document.querySelector("#tip-mfb");
						if (!tip) return;
	
						const tipWidth = tip.offsetWidth || 100;
						const tipHeight = tip.offsetHeight || 50;
	
						x = (x + tipWidth > window.scrollX + window.innerWidth) 
							? x - tipWidth - 40 
							: x;
						y = (y + tipHeight > window.scrollY + window.innerHeight) 
							? window.scrollY + window.innerHeight - tipHeight - 10 
							: y;
	
						if (ffb_config[id]["target"] !== "none") {
							_obj.style.fill = "rgba(255, 0, 0, 0.7)";
						}
						tip.style.display = "block";
						tip.innerHTML = ffb_config[id]["hover"];
						tip.style.left = `${x}px`;
						tip.style.top = `${y}px`;
	
						// Handle touchend for navigation
						_obj.addEventListener("touchend", () => {
							_obj.style.fill = "rgba(255, 0, 0, 0)";
							// if (ffb_config[id]["target"] === "_blank") {
							// 	window.open(ffb_config[id]["url"]);
							// } else if (ffb_config[id]["target"] === "_self") {
							// 	window.parent.location.href = ffb_config[id]["url"];
							// }
							tip.style.display = "none";
						}, { once: true });
					}
				});
			}
	
			_obj.style.cursor = "pointer";
	
			// Mouse events
			_obj.addEventListener("mouseenter", () => {
				const tip = document.querySelector("#tip-mfb");
				if (!tip) return;
	
				tip.style.display = "block";
				tip.innerHTML = ffb_config[id]["hover"];
				_obj.style.fill = "rgba(255, 0, 0, 0.3)";
			});
	
			_obj.addEventListener("mouseleave", () => {
				const tip = document.querySelector("#tip-mfb");
				if (!tip) return;
	
				tip.style.display = "none";
				_obj.style.fill = "rgba(255, 0, 0, 0)";
			});
	
			if (ffb_config[id]["target"] !== "none") {
				_obj.addEventListener("mousedown", () => {
					_obj.style.fill = "rgba(255, 0, 0, 0.7)";
				});
			}
	
			_obj.addEventListener("mouseup", () => {
				_obj.style.fill = "rgba(255, 0, 0, 0.3)";
				// if (ffb_config[id]["target"] === "_blank") {
				// 	window.open(ffb_config[id]["url"]);
				// } else if (ffb_config[id]["target"] === "_self") {
				// 	window.parent.location.href = ffb_config[id]["url"];
				// }
			});
	
			_obj.addEventListener("mousemove", (e) => {
				let x = e.pageX + 10;
				let y = e.pageY + 15;
	
				const tip = document.querySelector("#tip-mfb");
				if (!tip) return;
	
				const tipWidth = tip.offsetWidth || 100;
				const tipHeight = tip.offsetHeight || 50;
	
				x = (x + tipWidth > window.scrollX + window.innerWidth) 
					? x - tipWidth - 40 
					: x;
				y = (y + tipHeight > window.scrollY + window.innerHeight) 
					? window.scrollY + window.innerHeight - tipHeight - 10 
					: y;
	
				tip.style.left = `${x}px`;
				tip.style.top = `${y}px`;
			});
		} else {
			_obj.style.display = "none";
		}

		_obj.addEventListener("click", () => {
			// Get the class list correctly for an SVG element
			const classAttr = _obj.getAttribute("class") || ""; // Ensure it's a string
			const allClasses = classAttr.split(" ");
			const otherClasses = allClasses.filter(className => className !== "tattoo_selected").join(" ");

			if (!allClasses.includes("tattoo_selected")) {
				// If 'tattoo_selected' does not exist, apply styles and add the class
				_obj.style.fill = "rgba(255, 0, 0, 0.7)";
				_obj.setAttribute("class", `${classAttr} tattoo_selected`.trim()); // Add class properly
				addSelection(otherClasses);
			} else {
				// If 'tattoo_selected' exists, remove the styles and class
				_obj.style.fill = "rgba(255, 0, 0, 0)";
				_obj.setAttribute("class", otherClasses); // Remove class properly
				removeSelection(otherClasses);
			}
		});
		
		
		
	};

	const addSelection = (classToAdd) => {
		const tattooFinal = document.getElementById("tattoo_final");
	
		if (!tattooFinal) return; // Ensure the element exists
	
		let currentValue = tattooFinal.value.trim();
	
		// If the input already has values, append the new class with a comma
		tattooFinal.value = currentValue ? `${currentValue}, ${classToAdd}` : classToAdd;
	};
	
	const removeSelection = (classToRemove) => {
		const tattooFinal = document.getElementById("tattoo_final");
	
		if (!tattooFinal) return; // Ensure the element exists
	
		let currentValue = tattooFinal.value.trim();
	
		// Split, filter out the class to remove, and join back into a string
		tattooFinal.value = currentValue
			.split(',')
			.map(item => item.trim())
			.filter(item => item !== classToRemove)
			.join(', ');
	};
	
	
	// Expose the function to the global window object
	window.myScript = window.myScript || {};
	window.myScript.init = init;
	
})();
