<template>
    <v-layout id="layout" fill-height>
        <canvas :id="id">
        </canvas>
    </v-layout>
</template>

<script>

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
            pnpoly(xp, yp, x, y) {
                let c = false;
                for (let i = 0, j = this.zones.length - 1; i < this.zones.length; j = i++) {
                    if ((((yp[i] <= y) && (y < yp[j])) || ((yp[j] <= y) && (y < yp[i]))) &&
                        (yp[j] - yp[i] !== 0 && x > (xp[j] - xp[i]) * (y - yp[i]) / (yp[j] - yp[i]) + xp[i]))
                        c = !c;
                }
                return c;
            },
            drawZones(x = -1, y = -1, clicked = false) {
                const ctx = this.canvas.getContext('2d');
                this.zones.forEach(zone => {
                    const points = zone.points.slice();
                    const firstPoint = points.splice(0, 1);
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
        },
        mounted() {
            const layout = document.getElementById('layout');
            this.layout.height = layout.clientHeight;
            this.layout.width = layout.clientWidth;
            this.canvas = document.getElementById(this.id);

            const ctx = this.canvas.getContext('2d');
            const image = new Image();
            image.src = require('../assets/1.jpg');
            image.onload = () => {
                this.canvas.width = image.width;
                this.canvas.height = image.height;
                const rect = this.canvas.getBoundingClientRect();

                this.canvas.addEventListener('mousemove', (e) => {
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                    ctx.drawImage(image, 0, 0);
                    this.drawZones(x, y);
                });

                this.canvas.addEventListener('mouseup', (e) => {
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                    ctx.drawImage(image, 0, 0);
                    this.drawZones(x, y, true);
                });

                ctx.drawImage(image, 0, 0);
                this.drawZones();
            };
        }
    }
</script>

<style scoped>

</style>
