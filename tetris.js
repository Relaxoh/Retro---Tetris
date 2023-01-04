﻿window.onload = function() {
	const LARGEUR_GRILLE = 14;  // Nombre de cases en largeur
    const HAUTEUR_GRILLE = 28;  // Nombre de cases en hauteur
    const CARREAU = 20;	        // Taille en pixels d'une case de la grille
    var canvas;                 
    var ctx;
	
	// Position de la forme sur la grille
	const X_INITIAL = 5;
	const Y_INITIAL = 0;
    var formX = X_INITIAL;
    var formY = Y_INITIAL;

	// Numéro de la forme (du tableau "forme") à afficher 
	var numForme = 0;
	// Sélection de la version de la forme à afficher (différentes rotations possibles)
    var rotation = 0;
    
	// Tableau de définition des formes
    var forme = new Array();
    forme[0]= [ // Forme 1
        [	// rotation 0
            [0,0,0],
            [1,1,1],
            [0,0,1]
        ],
        [	// rotation 1
            [0,1,0],
            [0,1,0],
            [1,1,0]
        ],
        [	// rotation 2
            [1,0,0],
            [1,1,1],
            [0,0,0]
        ],
        [	// rotation 3
            [0,1,1],
            [0,1,0],
            [0,1,0]
        ]
    ]; 
    
	forme[1] = [ // Forme 2
        [	// rotation 0 (cette forme là n'a besoin que de 2 rotations)
            [0,0,0],
            [0,1,1],
            [1,1,0]
        ],
        [	// rotation 1
            [0,1,0],
            [0,1,1],
            [0,0,1]
        ]
    ];
    forme[2] = [ // Forme 3
        [	// rotation 0 (cette forme là n'a besoin que de 2 rotations)
            [0,0,0],
            [1,1,0],
            [0,1,1]
        ],
        [	// rotation 1
            [0,1,0],
            [1,1,0],
            [1,0,0]
        ]
    ];
    forme[3]= [ // Forme 4
        [	// rotation 0
            [0,1,0],
            [1,1,1],
            [0,0,0]
        ],
        [	// rotation 1
            [0,1,0],
            [0,1,1],
            [0,1,0]
        ],
        [	// rotation 2
            [0,0,0],
            [1,1,1],
            [0,1,0]
        ],
        [	// rotation 3
            [0,1,0],
            [1,1,0],
            [0,1,0]
        ]
    ];
    forme[4]= [ // Forme 5
        [	// rotation 0
            [0,0,0],
            [1,1,1],
            [1,0,0]
        ],
        [	// rotation 1
            [1,1,0],
            [0,1,0],
            [0,1,0]
        ],
        [	// rotation 2
            [0,0,1],
            [1,1,1],
            [0,0,0]
        ],
        [	// rotation 3
            [0,1,0],
            [0,1,0],
            [0,1,1]
        ]
    ];
    forme[5]= [ //forme 6
        [   // pas de changement en cas de rotation
            [0,0,0,0],
            [0,1,1,0],
            [0,1,1,0],
            [0,0,0,0]
        ]
    ];
    forme[6]= [ //forme 7
        [	// rotation 0
            [0,0,0,0],
            [0,0,0,0],
            [1,1,1,1],
            [0,0,0,0]
        ],
        [	// rotation 1
            [0,1,0,0],
            [0,1,0,0],
            [0,1,0,0],
            [0,1,0,0]
        ],
    ];

    // A compléter avec les autres formes    

	// !!! Fin du Tableau de définition des formes    
	
	// !!! Fin de déclaration des variables !!!
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////	    
	// !!! Les fonctions !!!
	
    // drawForme()
	//   Dessine une forme à l'écran 
	//   Variable utilisées :
	//		numForme : numéro de la forme à afficher (tableau forme)
	//		rotation : version de la forme à afficher (tableau forme[numForme])
	//		formX : Position horizontale de la forme sur la grille
	//		formY : Position verticale de la forme sur la grille
    function drawForme() {
		for(x=0 ; x<forme[numForme][rotation].length ; x++) {
			for(y=0 ; y<forme[numForme][rotation].length ; y++) {
                if(forme[numForme][rotation][y][x] == 1) {
                    ctx.fillStyle = "#FF0000"; // Couleur du contour de la forme
                    ctx.fillRect((formX + x) * CARREAU, (formY + y) * CARREAU, CARREAU, CARREAU); // Contour de la forme
                    ctx.fillStyle = "#00FF00"; // Couleur de remplissage de la forme
                    ctx.fillRect((formX + x) * CARREAU + 1, (formY + y) * CARREAU + 1, CARREAU - 2, CARREAU - 2); // Remplissage de la forme
                }
            }
        }
    }
    ///////////////////////////////////////////////////////
    // refreshCanvas()
	//   Rafraichi l'affichage :
	//      - efface le canvas
	//      - dessine la forme
    //      Utilisation de l'objet canvas : https://developer.mozilla.org/fr/docs/Web/API/Canvas_API/Tutorial/Basic_usage
    function refreshCanvas() {
		ctx.clearRect(0,0,LARGEUR_GRILLE * CARREAU, HAUTEUR_GRILLE * CARREAU); // Efface la grille
		drawForme(); // Dessine la forme
    }
    ///////////////////////////////////////////////////////
    // inti()
	//   Initialisation du canvas
    function init() {
        canvas = document.createElement('canvas');
        canvas.width = LARGEUR_GRILLE * CARREAU;
        canvas.height = HAUTEUR_GRILLE * CARREAU;
        canvas.style.border = "1px solid";
        document.body.appendChild(canvas);  // Ajoute le canvas à la page html
        ctx = canvas.getContext('2d');

		refreshCanvas();
    }
    // !!! Fin des fonctions !!!
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    // !!! Code !!!
	// Seule ligne de code... avec la gestion des évènements clavier
    init();

	// Gestion des évènements clavier
    window.addEventListener("keydown", function(event) {
        var key = event.key;
        switch(key) {
            // Remarque : Pour connaitre les "keycodes" : https://keycode.info/
            case 'ArrowUp':  // flèche haut => rotation horaire de la forme
                rotation++;
                if(rotation >  forme[numForme].length - 1) rotation = 0;
                refreshCanvas();
                break;
            
            case 't':  // toutche t
                // à compléter
				// pour test, ne fait pas parti du jeu final
				// permet de changer la pièce à afficher (changement de la variable numForme)
                break;
        }
      }, true);
}