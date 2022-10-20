// Probably quite redundant, hehe

function setDarkMode() {
	document.documentElement.setAttribute("color-mode", "dark");
	if(document.getElementById('lightmodehl')) {
		document.getElementById('darkmodehl').removeAttribute('disabled');
		document.getElementById('lightmodehl').disabled = true;
	}
}
function setLightMode() {
	document.documentElement.setAttribute("color-mode", "light");
	if(document.getElementById('lightmodehl')) {
				document.getElementById('lightmodehl').removeAttribute('disabled');
				document.getElementById('darkmodehl').disabled = true;
	}
}

if (localStorage.getItem("color-mode") === "dark" ||
   (window.matchMedia("(prefers-color-scheme: dark)").matches && !localStorage.getItem("color-mode"))
) {
	setDarkMode();
}

document.addEventListener("DOMContentLoaded", function(event) {
	document.documentElement.setAttribute("color-mode", "light");

	var darkMem = localStorage.getItem("darkmodeon");
	if(darkMem !== null) {
		if(darkMem=="light") setLightMode();
		else setDarkMode();
	} else if((window.matchMedia("(prefers-color-scheme: dark)").matches)) {
		setDarkMode();
	}

	var dmt = document.getElementById("dm-toggle");

	dmt.onclick = function() {
		var ct = document.documentElement.getAttribute("color-mode");
		var switchToTheme = ct === "dark" ? "light" : "dark"
		localStorage.setItem("darkmodeon", switchToTheme);
		if(switchToTheme=="light") {
			setLightMode();
		} else {
			setDarkMode();
		}
	}
});
