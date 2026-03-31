export async function handleClipboard(func, timeout) {
    try {
        const url = window.location.href;
        await navigator.clipboard.writeText(url);
        func(true);
    } catch (e) {
        console.log(e.message);
    }
    if (timeout.current) {
        clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
        func(false);
    }, 1000);
}
