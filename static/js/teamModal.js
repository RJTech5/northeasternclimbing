let MODAL = `<div id="teamOverlay" class="modal-overlay" style="display: none;">
  <div class="modal-content">
    <span class="close-btn" onclick="closeModal()">&times;</span>
    <h2 style="font-family: 'Roboto', sans-serif;">Northeastern Club Climbing Team</h2>
    <div class="row" style="background: none; box-shadow: none;">
        <div class="column">
        <p style="font-size: 1.4em;">Looking for a structured, competitive climbing team environment? Check out Northeastern University’s club
         climbing team! Northeastern club climbing meets regularly to practice, compete in regional and national
          climbing competitions, and hosts tryouts in the Fall and Spring semesters. <a href="https://northeasternclimbing.github.io/team/"
           target="_blank">Visit their website here.</a></p>
        </div>
        <div class="column" style="width: 50%;">
        <img src="../../static/images/climbing-team.webp" style="width: 100%">
        </div>
     </div>
     <button onclick="closeModal()" class="homeJoinButton" style="width: 10vw; height: 5vh; min-width: 100px; min-height: 50px; font-size: 1em;">Back to NRC</button>
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