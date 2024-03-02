# Configuración del Proyecto

Primero, necesitamos configurar nuestro proyecto con Webpack.

### Pasos:

1. Inicializa un proyecto npm:
    ```
    npm init -y
    ```

2. Instala webpack y webpack-cli como dependencias de desarrollo:
    ```
    npm install webpack webpack-cli --save-dev
    ```

3. Instala el cargador de archivos para cargar archivos binarios, como imágenes y modelos 3D, que serán utilizados por Three.js:
    ```
    npm install file-loader --save-dev
    ```

4. Configura Webpack creando un archivo `webpack.config.js` en la raíz del proyecto:
    ```javascript
    const path = require('path');

    module.exports = {
        mode: 'development',
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js',
        },
        module: {
            rules: [
                {
                    test: /\.(png|jpg|gif|glb)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                        },
                    ],
                },
            ],
        },
    };
    ```


## Integración de Three.js

Una vez configurado Webpack, podemos comenzar a trabajar con Three.js.

### Pasos:

1. Instala Three.js:
    ```
    npm install three
    ```

2. Crea un archivo `index.js` dentro de la carpeta `src` para escribir tu código de aplicación Three.js:
    ```javascript
    import * as THREE from 'three';

    // Configura la escena, la cámara y el renderizador
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Crea una geometría y un material
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    // Renderiza la escena
    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();

## Ejecutar la Aplicación

Para ejecutar la aplicación, primero debemos compilar nuestro código con Webpack y luego abrir `index.html` en un navegador web.

### Pasos:

1. Ejecuta el comando de compilación de Webpack:
    ```
    npx webpack
    ```

2. Abre `index.html` en un navegador web para ver la aplicación Three.js en acción.

¡Listo! Ahora tienes una aplicación básica de Three.js integrada con Webpack. Puedes expandir esta aplicación agregando más geometrías, materiales, luces y efectos según tus necesidades.
