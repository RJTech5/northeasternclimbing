let MODAL = `<div id="teamOverlay" class="modal-overlay" style="display: none;">
  <div class="modal-content">
    <span class="close-btn" onclick="closeModal()">&times;</span>
    <h2>Northeastern Club Climbing Team</h2>
    <div class="row" style="background: none; box-shadow: none;">
        <div class="column" style="width: 50%;">
        <p>This is your modal content.</p>
        </div>
        <div class="column" style="width: 50%;">
        <img src="../../static/images/climbing-team.webp" style="width: 100%">
        </div>
     </div>
     <button onclick="closeModal()" class="homeJoinButton" style="width: 10vw; height: 5vh; font-size: 1em;">Back to NRC</button>
</div>
</div>`;

function showModal() {
    let modal = document.getElementById("teamOverlay");
    if (modal == null) {
        document.body.insertAdjacentHTML("afterbegin", MODAL);
        modal = document.getElementById("teamOverlay");
    }
    modal.style.display = "flex";
}

function closeModal() {
    document.getElementById("teamOverlay").style.display = "none";
}