<template>
    <v-layout id="layout" fill-height row justify-center>

        <v-toolbar absolute dark color="primary">
            <v-btn icon dark @click.native="$emit('close')">
                <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Редактирование зон</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn v-if="!currentZone" color="secondary" @click="addZone">Add zone</v-btn>
            <v-btn v-if="currentZone && currentZone.points.length > 2" color="secondary" @click="saveCurrentZone">Save
                zone
            </v-btn>
            <v-btn v-if="currentZone" color="secondary" @click="removeCurrentZone">Cancel</v-btn>
            <v-spacer></v-spacer>
            <v-btn v-if="changes.length > 0" @click="saveChanges">Save changes</v-btn>
        </v-toolbar>


        <v-flex xs9>
            <canvas id="canvas">
            </canvas>
        </v-flex>

        <v-flex xs3 class="mt-5">

            <v-expansion-panel class="mt-3">
                <v-expansion-panel-content
                        v-for="(zone, zoneIndex) in zones"
                        :key="zoneIndex"
                >
                    <template v-slot:actions>
                        <v-icon color="primary">$vuetify.icons.expand</v-icon>
                        <v-btn
                                icon
                                v-if="!(currentZone && zoneIndex + 1 === zones.length)"
                                @click="handleDeleteZone(zoneIndex)"
                        >
                            <v-icon color="primary">delete</v-icon>
                        </v-btn>
                    </template>
                    <template v-slot:header>
                        <v-text-field
                                :value="zone.name"
                                label="x"
                                @input="handleZoneNameInput(zoneIndex, $event)"
                        ></v-text-field>
                    </template>
                    <v-card v-if="zone.points.length > 0">
                        <v-list dense two-line>
                            <template v-for="(point, pointIndex) in zone.points">
                                <v-list-tile
                                        :key="pointIndex"
                                        avatar
                                >

                                    <v-list-tile-content>
                                        <v-layout row wrap>
                                            <v-flex xs5>
                                                <v-text-field
                                                        :value="point.x"
                                                        label="x"
                                                        @input="handlePointInput('x', zoneIndex, pointIndex, $event)"
                                                ></v-text-field>
                                            </v-flex>
                                            <v-flex xs5>
                                                <v-text-field
                                                        :value="point.y"
                                                        label="y"
                                                        @input="handlePointInput('y', zoneIndex, pointIndex, $event)"
                                                ></v-text-field>
                                            </v-flex>
                                            <v-flex xs2>
                                                <v-btn
                                                        icon
                                                        @click="handleDeletePoint(zoneIndex, pointIndex)"
                                                >
                                                    <v-icon color="primary">delete</v-icon>
                                                </v-btn>
                                            </v-flex>
                                        </v-layout>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </template>
                        </v-list>
                    </v-card>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-flex>

    </v-layout>
</template>

<script>

    import lodash from 'lodash';

    const newZoneDefault = {
        name: "new zone",
        points: [],
    };

    export default {
        name: "ZoneEditor",
        props: {
            value: {
                type: Object,
                default: () => {
                },
            },
        },
        data() {
            return {
                dialog: false,
                canvas: null,
                currentZone: null,
                currentZones: [],
                changes: [],
                addPointEventListener: (e) => {
                    const rect = this.canvas.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    this.currentZone.points.push({x: x, y: y});
                    this.drawZones();
                },
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
                ctx.drawImage(this.photo, 0, 0);
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
            addZone() {
                this.currentZone = lodash.cloneDeep(newZoneDefault);
                this.canvas.addEventListener('mousedown', this.addPointEventListener);
                this.drawZones();
            },
            saveCurrentZone() {
                this.canvas.removeEventListener('mousedown', this.addPointEventListener);
                this.currentZones.push(lodash.cloneDeep(this.currentZone));
                this.changes.push({changeType: 'addZone', value: lodash.cloneDeep(this.currentZone)})
                this.currentZone = null;
            },
            removeCurrentZone() {
                this.canvas.removeEventListener('mousedown', this.addPointEventListener);
                this.currentZone = null;
                this.drawZones();
            },
            saveChanges() {
                //TODO BATCH REQUEST (FILTER AND ARRAY PAYLOAD)
                this.changes.forEach(({changeType, value}) => {
                    switch (changeType) {
                        case 'deleteZone': {
                            this.$emit('deleteZone', value);
                            break;
                        }
                        case 'addZone': {
                            break;
                        }
                        case 'editPoint': {
                            this.$emit('editPoint', value);
                            break;
                        }
                    }
                });
                this.changes.splice(0, this.change.length);
            },
            handlePointInput(coordinateName, zoneIndex, pointIndex, value) {
                if (this.currentZone && zoneIndex + 1 === this.zones.length) {
                    this.currentZone.points[pointIndex][coordinateName] = value
                } else {
                    this.currentZones[zoneIndex].points[pointIndex][coordinateName] = value;
                    this.changes.push({
                        changeType: 'editPoint',
                        value: this.currentZones[zoneIndex].points[pointIndex]
                    });
                }
                this.drawZones();
            },
            handleDeleteZone(zoneIndex) {
                const deletedValue = this.currentZones.splice(zoneIndex, 1);
                this.changes.push({changeType: 'deleteZone', value: deletedValue});
                this.drawZones();
            },
            handleDeletePoint(zoneIndex, pointIndex) {
                if (this.currentZone && zoneIndex + 1 === this.zones.length) {
                    this.currentZone.points.splice(pointIndex, 1);
                } else {
                    const deletedPoint = this.currentZones[zoneIndex].points.splice(pointIndex, 1);
                    this.changes.push({changeType: 'deletePoint', value: deletedPoint});
                }
                this.drawZones();
            },
            handleZoneNameInput(zoneIndex, value) {
                if (this.currentZone && zoneIndex + 1 === this.zones.length) {
                    this.currentZone.name = value
                } else {
                    this.currentZones[zoneIndex].name = value;
                    this.changes.push({changeType: 'changeZoneName', value: this.currentZones[zoneIndex]});
                }
                this.drawZones();
            },
        },
        mounted() {
            this.currentZones = this.value.zones.slice();
            this.canvas = document.getElementById('canvas');
            this.photo.onload = () => {
                this.canvas.width = this.photo.width;
                this.canvas.height = this.photo.height;
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
        computed: {
            photo() {
                const image = new Image();
                image.src = `data:image/jpeg;base64,${this.value.photo}`;
                return image;
            },
            zones() {
                if (this.currentZone) {
                    return this.currentZones.concat([this.currentZone])
                } else {
                    return this.currentZones
                }
            },
        },
    }
</script>

<style scoped>

</style>
