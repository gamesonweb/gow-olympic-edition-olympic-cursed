class SoundManager {
    constructor(scene,  musicName) {
        this.scene = scene;

        this.musicName = musicName;
        this.musicSound = null;
    }

    initMusic() {
        const music = () => {
            this.musicSound = new BABYLON.Sound("", "./models/Music/"+this.musicName, this.scene, null, {
                loop: true,
                autoplay: true,
            });
        };

        window.addEventListener('click', () => {
            if (BABYLON.Engine.audioEngine.audioContext.state === 'suspended') {
                BABYLON.Engine.audioEngine.audioContext.resume().then(() => {
                    music();
                });
            } else {
                music();
            }
        }, { once: true });
    }

    stopMusic() {
        if (this.musicSound) {
            this.musicSound.stop();
        }
    }
}
export default SoundManager;