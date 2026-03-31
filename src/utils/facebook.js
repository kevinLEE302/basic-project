export function facebookShare() {
    const url = window.location.href;
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;

    window.open(shareUrl, '_blank', 'width=600,height=400');
}
