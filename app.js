const Application = function () {
  this.initA4();
  this.tuner = new Tuner(this.a4);
  this.notes = new Notes(".notes", this.tuner);
  this.meter = new Meter(".meter");
  this.frequencyBars = new FrequencyBars(".frequency-bars");
  this.update({
    name: "A",
    frequency: this.a4,
    octave: 4,
    value: 69,
    cents: 0,
  });
};

Application.prototype.initA4 = function () {
  this.$a4 = document.querySelector(".a4 span");
  this.a4 = parseInt(localStorage.getItem("a4")) || 440;
  this.$a4.innerHTML = "A";
  this.$a5 = document.querySelector(".a5 span");
  this.$a5.innerHTML = "A#";
  this.$a6 = document.querySelector(".a6 span");
  this.$a6.innerHTML = "B";
  this.$a7 = document.querySelector(".a7 span");
  this.$a7.innerHTML = "C";
  this.$a8 = document.querySelector(".a8 span");
  this.$a8.innerHTML = "C#";
  this.$a9 = document.querySelector(".a9 span");
  this.$a9.innerHTML = "D";
  this.$a10 = document.querySelector(".a10 span");
  this.$a10.innerHTML = "D#";
  this.$a11 = document.querySelector(".a11 span");
  this.$a11.innerHTML = "E";
  this.$a12 = document.querySelector(".a12 span");
  this.$a12.innerHTML = "F";
  this.$a13 = document.querySelector(".a13 span");
  this.$a13.innerHTML = "F#";
  this.$a14 = document.querySelector(".a14 span");
  this.$a14.innerHTML = "G";
  this.$a15 = document.querySelector(".a15 span");
  this.$a15.innerHTML = "G#";
};

Application.prototype.start = function () {
  const self = this;

  this.tuner.onNoteDetected = function (note) {
    if (self.notes.isAutoMode) {
      if (self.lastNote === note.name) {
        self.update(note);
      } else {
        self.lastNote = note.name;
      }
    }
  };

  swal.fire("Spardha Sur Sadhana").then(function () {
    self.tuner.init();
    self.frequencyData = new Uint8Array(self.tuner.analyser.frequencyBinCount);
  });
 
  this.$a4.addEventListener("click", function (e) {
    localStorage.setItem("a4", 739);
    window.location.reload();
  });
  this.$a5.addEventListener("click", function (e) {
    localStorage.setItem("a4", 783);
    window.location.reload();
  });
  this.$a6.addEventListener("click", function (e) {
    localStorage.setItem("a4", 830);
    window.location.reload();
  });
  this.$a7.addEventListener("click", function (e) {
    localStorage.setItem("a4", 880);
    window.location.reload();
  });
  this.$a8.addEventListener("click", function (e) {
    localStorage.setItem("a4", 932);
    window.location.reload();
  });
  this.$a9.addEventListener("click", function (e) {
    localStorage.setItem("a4", 987);
    window.location.reload();
  });
  this.$a10.addEventListener("click", function (e) {
    localStorage.setItem("a4", 1046);
    window.location.reload();
  });
  this.$a11.addEventListener("click", function (e) {
    localStorage.setItem("a4", 1108);
    window.location.reload();
  });
  this.$a12.addEventListener("click", function (e) {
    localStorage.setItem("a4", 1174);
    window.location.reload();
  });
  this.$a13.addEventListener("click", function (e) {
    localStorage.setItem("a4", 1244);
    window.location.reload();
  });
  this.$a14.addEventListener("click", function (e) {
    localStorage.setItem("a4", 1318);
    window.location.reload();
  });
  this.$a15.addEventListener("click", function (e) {
    localStorage.setItem("a4", 1396);
    window.location.reload();
  });
  this.updateFrequencyBars();

  document.querySelector(".auto input").addEventListener("change", () => {
    this.notes.toggleAutoMode();
  });
};

Application.prototype.updateFrequencyBars = function () {
  if (this.tuner.analyser) {
    this.tuner.analyser.getByteFrequencyData(this.frequencyData);
    this.frequencyBars.update(this.frequencyData);
  }
  requestAnimationFrame(this.updateFrequencyBars.bind(this));
};

Application.prototype.update = function (note) {
  this.notes.update(note);
  this.meter.update((note.cents / 50) * 45);
};

const app = new Application();
app.start();
