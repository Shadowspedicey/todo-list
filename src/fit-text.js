export default function fitText(text, parent, rate)
{
	function isOverflown(element) 
	{
		return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
	}

	let fontsize = parseFloat(window.getComputedStyle(text, null).getPropertyValue("font-size"));

	while (isOverflown(parent))
	{
		fontsize -= rate;
		text.style.fontSize = fontsize + "px";
	}
}
