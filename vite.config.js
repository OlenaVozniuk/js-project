import {defineConfig} from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    build: {
        manifest: true,
        emptyOutDir: true,
        assetsDir: '',
        outDir: 'public/build',
        rollupOptions: {
            output: {
                chunkFileNames: 'js/[name]-[hash].js',
                entryFileNames: 'js/[name]-[hash].js',
                assetFileNames: ({name}) => {
                    if (/\.(avif|webp|gif|jpe?g|png)$/.test(name ?? '')){
                        return 'images/[name]-[hash][extname]';
                    }
                    if (/\.(svg)$/.test(name ?? '')){
                        return 'sprite/[name]-[hash][extname]';
                    }
                    if (/\.(woff|woff2|ttf)$/.test(name ?? '')) {
                        return 'fonts/[name]-[hash][extname]';
                    }
                    if (/\.css$/.test(name ?? '')) {
                        return 'css/[name]-[hash][extname]';
                    }
                    return '[name]-[hash][extname]';
                },

            }
        }
    },
    plugins: [
        laravel({
            input: [
                'resources/js/app.js',
                'resources/js/bootstrap.js',
                'resources/js/file.js',
            ],
            refresh: true,
        }),
    ],
})
