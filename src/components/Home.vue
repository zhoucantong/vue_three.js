<template>
  <div id="renderBox">
    <canvas id="renderTarget"></canvas>
  </div>
</template>
<style lang="postcss">
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import * as THREE from 'three'
import Stats from 'stats.js'

@Component
export default class Home extends Vue {
  lastTopicNum = 0
  camera?: THREE.PerspectiveCamera
  scene?: THREE.Scene
  rendererBg?: THREE.WebGLRenderer
  renderer?: THREE.WebGLRenderer
  stats?: Stats
  targetCanvas: HTMLElement | null = null
  mesh?: THREE.Mesh<THREE.BoxGeometry, THREE.MeshNormalMaterial>
  renderBox: HTMLElement | null = null
  animationFrameIndex = -1

  mounted() {
    console.log('Home mounted')
    this.threeInit()
  }

  beforeDestroy() {
    this.destroyThreeJS()
  }

  threeInit() {
    this.camera =
      new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 1000)
    this.camera.position.z = Math.sqrt(3)
    this.scene = new THREE.Scene()
    const light = new THREE.AmbientLight(0xffffff)
    this.scene.add(light)

    const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
    const material = new THREE.MeshNormalMaterial();

    this.mesh = new THREE.Mesh( geometry, material );
    if (this.mesh !== undefined) {
      this.scene.add( this.mesh );
    }

    const targetCanvas = document.getElementById("renderTarget") as HTMLCanvasElement
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: targetCanvas,
      alpha: true,
    })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setClearColor( 0x000000, 1)

    this.renderBox = document.getElementById('renderBox')

    this.stats = new Stats()
    this.stats.dom.classList.add('stats-dom')
    if (this.renderBox){
      this.renderBox.appendChild(this.stats.dom)
    }

    this.animationFrameIndex = requestAnimationFrame(this.animate)

    window.addEventListener(
      'resize',
      this.onWindowResize.bind(this),
      false
    )
  }

  onWindowResize () {
    if (this.camera) {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
    }

    if (this.renderer) {
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    }
  }

  animate() {
    this.animationFrameIndex = requestAnimationFrame(this.animate)

    if (this.stats) {
      this.stats.begin()
    }

    if (
      !this.scene
      || !this.camera
      ) {
      return
    }
    if (this.mesh !== undefined) {
      this.mesh.rotation.x += 0.01
      this.mesh.rotation.y += 0.02
    }

    if (this.renderer) {
      this.renderer.render(this.scene, this.camera)
    }

    if (this.stats) {
      this.stats.end()
    }
  }

  destroyThreeJS() {
    if (this.stats && this.renderBox) {
      this.renderBox.removeChild(this.stats.dom)
    }
    cancelAnimationFrame(this.animationFrameIndex)
  }

}
</script>
