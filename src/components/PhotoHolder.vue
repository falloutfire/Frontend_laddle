<template>
    <v-layout id="layout" fill-height>
        <canvas id="canvas">
        </canvas>
    </v-layout>
</template>

<script>
    import lodash from 'lodash';

    export default {
        name: "PhotoHolder",
        props: {
            id: {
                type: String,
                default: '1',
            },
            zones: {
                type: Array,
                default: () => [],
            },
            photo: {
                type: String,
                default: "",
            },
        },
        data() {
            return {
                canvas: null,
                layout: {
                    height: null,
                    width: null,
                }
            }
        },
        methods: {
            drawZones(x = -1, y = -1, clicked = false) {
                const ctx = this.canvas.getContext('2d');
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                ctx.drawImage(this.ladlePhoto, 0, 0, this.ladlePhoto.width, this.ladlePhoto.height);
                this.zones.forEach(zone => {
                    const points = zone.points.slice();
                    const [firstPoint] = points.slice(0, 1);
                    if (firstPoint) {
                        ctx.beginPath();
                        ctx.moveTo(firstPoint.x, firstPoint.y);
                        points.forEach(point => {
                            ctx.lineTo(point.x, point.y);
                        });
                        ctx.closePath();
                        ctx.stroke();
                        if (x > -1 && y > -1 && ctx.isPointInPath(x, y)) {
                            ctx.fillStyle = "rgba(255,65,15,0.50)";
                            ctx.fill();
                            ctx.fillStyle = "black";
                            ctx.font = '20px Times';
                            const textMeasurement = ctx.measureText(zone.name);
                            ctx.clearRect(x + 10, y - 15, textMeasurement.width + 10, 20);
                            ctx.fillText(zone.name, x + 15, y);
                            if (clicked) {
                                this.$emit('zone-clicked', zone);
                            }
                        } else {
                            ctx.fillStyle = "rgba(255,60,10,0.40)";
                            ctx.fill();
                        }
                    }
                })
            },
            init() {
                this.ladlePhoto.onload = () => {
                    this.canvas.width = this.ladlePhoto.width;
                    this.canvas.height = this.ladlePhoto.height;
                    const rect = this.canvas.getBoundingClientRect();

                    this.canvas.addEventListener('mousemove', (e) => {
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        this.drawZones(x, y);
                    });

                    this.canvas.addEventListener('mouseup', (e) => {
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        this.drawZones(x, y, true);
                    });
                    this.drawZones();
                };
            },
        },
        mounted() {
            const layout = document.getElementById('layout');
            this.layout.height = layout.clientHeight;
            this.layout.width = layout.clientWidth;
            this.canvas = document.getElementById('canvas');
            this.init();
            //const debouncedDrawZones = lodash.debounce(this.drawZones, .750);
        },
        computed: {
            ladlePhoto() {
                const image = new Image();
                image.src = `data:image/jpeg;base64,${this.photo}`;
                return image;
            },
        },
        watch: {
            ladlePhoto() {
                this.init();
            },
        }
    }
</script>

<style scoped>

</style>
