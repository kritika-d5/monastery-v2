var APP_DATA = {
  "scenes": [
    {
      "id": "0-institute_exterior",
      "name": "institute_exterior",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        }
      ],
      "faceSize": 508,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": -0.09525024145832539,
          "pitch": 0.1387148441251611,
          "rotation": 0,
          "target": "1-institute_interior"
        },
        {
          "yaw": -1.6821762568870078,
          "pitch": -0.03130819989755551,
          "rotation": 1.5707963267948966,
          "target": "3-rumtekcourtyard"
        }
      ],
      "infoHotspots": [
        {
          "yaw": 0.014479223992664103,
          "pitch": 0.23895434482443,
          "title": "Visit the Nalanda Institute",
          "text": "The Nalanda Institute is a renowned Tibetan Buddhist learning center located within the monastery complex. It focuses on Buddhist philosophy, meditation, and the preservation of ancient teachings.",
             "audioFile": "audios/4_nalanda_ext.mp3"
        },
        {
          "yaw": -1.6057587680493839,
          "pitch": 0.08199139495893704,
          "title": "Go back to the courtyard",
          "text": "Go back to the main courtyard of the monastery, where you can find other important areas.",
             "audioFile": "audios/1_courtyard_audio.mp3"
        }
      ]
    },
    {
      "id": "1-institute_interior",
      "name": "institute_interior",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        }
      ],
      "faceSize": 508,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": -0.07301263005298964,
          "pitch": -0.020561065711328652,
          "rotation": 0,
          "target": "0-institute_exterior"
        }
      ],
      "infoHotspots": [
        {
          "yaw": 0.0034418270032787746,
          "pitch": 0.08814066171769319,
          "title": "Way to the Institute Exterior",
          "text": "This path leads back to the exterior of the Nalanda Institute.",
             "audioFile": "audios/5_nalanda_int.mp3"
        }
      ]
    },
    {
      "id": "2-monks_quarters",
      "name": "monks_quarters",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        }
      ],
      "faceSize": 508,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": -1.468488287690679,
          "pitch": 0.059064981430640984,
          "rotation": 4.71238898038469,
          "target": "3-rumtekcourtyard"
        }
      ],
      "infoHotspots": [
        {
          "yaw": -1.3729934021442851,
          "pitch": 0.1603732331401133,
          "title": "Way to the courtyard",
          "text": "The path to the main courtyard, where most of the main attractions of the monastery are located.",
             "audioFile": "audios/7_monkquarters.mp3"
        }
      ]
    },
    {
      "id": "3-rumtekcourtyard",
      "name": "rumtekcourtyard",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        }
      ],
      "faceSize": 364,
      "initialViewParameters": {
        "yaw": 0.054946527801568834,
        "pitch": 0,
        "fov": 1.3401592523986738
      },
      "linkHotspots": [
        {
          "yaw": 0.034249028976070406,
          "pitch": 0.2723473151191751,
          "rotation": 0,
          "target": "4-rumtektemple"
        },
        {
          "yaw": -1.1515106990397577,
          "pitch": 0.049223333092683674,
          "rotation": 7.853981633974483,
          "target": "5-stupa_exterior"
        },
        {
          "yaw": -2.3414188025739016,
          "pitch": 0.04432405390016214,
          "rotation": 17.27875959474387,
          "target": "0-institute_exterior"
        },
        {
          "yaw": 2.3725132397776836,
          "pitch": 0.026327254960300195,
          "rotation": 7.853981633974483,
          "target": "2-monks_quarters"
        }
      ],
      "infoHotspots": [
        {
          "yaw": 0.13815410386846771,
          "pitch": 0.37723901601225407,
          "title": "Way to the main temple",
          "text": "The central area of the monastery where visitors and monks gather. It offers a serene atmosphere with stunning views of the surrounding mountains and the intricate architecture of the monastery.",
             "audioFile": "audios/8_final.mp3"
        },
        {
          "yaw": -1.0406666222090095,
          "pitch": 0.15638240000111203,
          "title": "Way to the Golden Stupa",
          "text": "A sacred structure located within the monastery, housing relics of revered Buddhist figures. It serves as a place of meditation and spiritual reflection.",
             "audioFile": "audios/2_stupa_audio.mp3"
        },
        {
          "yaw": -2.2507220795522365,
          "pitch": 0.1518574482625894,
          "title": "Way to Nalanda institute",
          "text": "A renowned Tibetan Buddhist learning center located within the monastery complex. It focuses on Buddhist philosophy, meditation, and the preservation of ancient teachings.",
             "audioFile": "audios/4_nalanda_ext.mp3"
        },
        {
          "yaw": 2.437105339890506,
          "pitch": 0.11077807003172602,
          "title": "Way to the Monk's quarters",
          "text": "Simple, yet peaceful living spaces for the resident monks. These quarters are designed to encourage a life of meditation, study, and community service",
             "audioFile": "audios/7_monkquarters.mp3"
        }
      ]
    },
    {
      "id": "4-rumtektemple",
      "name": "rumtektemple",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        }
      ],
      "faceSize": 364,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": -3.124251434267201,
          "pitch": 0.0914047532147606,
          "rotation": 0,
          "target": "3-rumtekcourtyard"
        }
      ],
      "infoHotspots": [
        {
          "yaw": -3.013140105795568,
          "pitch": 0.18115353672082257,
          "title": "Way to the Courtyard",
          "text": "The path to the main courtyard, where most of the main attractions of the monastery are located.",
             "audioFile": "audios/1_courtyard_audio.mp3"
        }
      ]
    },
    {
      "id": "5-stupa_exterior",
      "name": "stupa_exterior",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        }
      ],
      "faceSize": 508,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 0.9640229482297098,
          "pitch": 0.003875776742141568,
          "rotation": 1.5707963267948966,
          "target": "3-rumtekcourtyard"
        }
      ],
      "infoHotspots": [
        {
          "yaw": 1.0726029242211368,
          "pitch": 0.08459770596793703,
          "title": "Way to courtyard",
          "text": "The path to the main courtyard, where most of the main attractions of the monastery are located.",
             "audioFile": "audios/1_courtyard_audio.mp3"
        }
      ]
    }
  ],
  "name": "Rumtek_tour",
  "settings": {
    "mouseViewMode": "drag",
    "autorotateEnabled": true,
    "fullscreenButton": false,
    "viewControlButtons": false
  }
};