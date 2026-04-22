class AudioEngine {
    constructor() {
        this.ctx = null;
        this.playing = false;
    }
    init() {
        if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    playTone(freq, type, duration, vol = 0.1) {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        g.gain.setValueAtTime(vol, this.ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
        osc.connect(g).connect(this.ctx.destination);
        osc.start(); osc.stop(this.ctx.currentTime + duration);
    }
    playTheme() {
        if (this.playing) return;
        this.playing = true;
        const melody = [[659,4],[493,8],[523,8],[587,4],[523,8],[493,8],[440,4],[440,8],[523,8],[659,4],[587,8],[523,8],[493,4],[523,8],[587,4],[659,4],[523,4],[440,4]];
        let i = 0;
        setInterval(() => {
            this.playTone(melody[i][0], 'square', 0.2, 0.03);
            i = (i + 1) % melody.length;
        }, 250);
    }
}
const audio = new AudioEngine();