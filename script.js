function addItem() {
    const row = document.createElement("div");

    row.className = "item-row";

    row.innerHTML = `
        <input type="number" class="item-price" placeholder="上限額">
        <input type="number" class="item-qty" placeholder="個数">
        <button onclick="removeItem(this)">削除</button>
    `;

    document.getElementById("items").appendChild(row);
}

function removeItem(button) {
    button.parentElement.remove();
    calc();
}

function calc() {
    const prices = document.querySelectorAll(".item-price");
    const qtys = document.querySelectorAll(".item-qty");
    const shipping = Number(document.getElementById("shipping").value) || 0;

    let totalLimit = 0;
    let totalQty = 0;

    for (let i = 0; i < prices.length; i++) {
        const price = Number(prices[i].value) || 0;
        const qty = Number(qtys[i].value) || 0;

        totalLimit += price * qty;
        totalQty += qty;
    }

    const maxBid = (totalLimit - shipping) / 1.1;
    const avgPrice = totalQty > 0 ? maxBid / totalQty : 0;

    document.getElementById("result").innerHTML = `
        商品数：${totalQty.toLocaleString()} 点<br>
        仕入れ上限合計：${Math.floor(totalLimit).toLocaleString()} 円<br>
        送料：${shipping.toLocaleString()} 円<br>
        <hr>
        上限入札額：${Math.floor(maxBid).toLocaleString()} 円<br>
        平均入札単価：${Math.floor(avgPrice).toLocaleString()} 円
    `;
}

document.addEventListener("input", function () {
    calc();
});
