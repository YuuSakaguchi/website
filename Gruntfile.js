module.exports = function(grunt) {

  grunt.initConfig({

    watch: {
      haml: {
        files: ['app/assets/templates/**/*.haml'],
        tasks: ['newer:haml', 'ngtemplates', 'concat'],
        options: {
          spawn: false,
        },
      },

      js: {
        files: ['app/assets/javascripts/**/*.js'],
        tasks: [ 'concat:app', 'babel', 'browserify', 'concat:dist'],
        options: {
          spawn: false,
        },
      },

      markdown: {
        files: ['app/assets/doc/**/*.md'],
        tasks: ['markdown', 'ngtemplates', 'concat', 'ngAnnotate'],
        options: {
          spawn: false,
        },
      },

      css: {
        files: ['app/assets/stylesheets/**/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false,
        },
      }
    },

    sass: {
      dist: {
        options: {
         style: 'expanded'
       },
        files: {
          'vendor/assets/stylesheets/app.css': 'app/assets/stylesheets/main.css.scss'
        }
      }
    },

    haml: {
      dist: {
        expand: true,
        ext: '.html',
        extDot: 'last',
        src: ['app/assets/templates/**/*.haml'],
        dest: 'app/assets/templates/generated/',
        rename: function (dest, src) {
          return dest + src.replace(".html", "");
        }
      },
    },

    markdown: {
      all: {
        files: [
          {
            expand: true,
            src: 'app/assets/doc/*.md',
            dest: 'app/assets/templates/generated/',
            ext: '.html'
          }
        ],

        options: {
         templateContext: {},
         contextBinder: true,
         contextBinderMark: '@@@',
         autoTemplate: false,
         autoTemplateFormat: 'jst',
         markdownOptions: {
           gfm: true,
           highlight: 'manual',
           codeLines: {
             before: '<span>',
             after: '</span>'
           }
         }
       }
     }
   },

    ngtemplates:  {
      templates: {
        cwd: 'app/assets/templates/generated/app/assets/',
        src: ['**/*.html'],
        dest: 'vendor/assets/javascripts/templates.js',
        options: {
          module: 'app.main'
        }
      }
    },

     concat: {
       options: {
         separator: ';',
       },
       app: {
         src: [
           'app/assets/javascripts/**/*.js',
         ],
         dest: 'vendor/assets/javascripts/app.js',
       },

       lib: {
         src: [
           'vendor/assets/bower_components/angular/angular.js',
           'vendor/assets/bower_components/angular-ui-router/release/angular-ui-router.js',
           'vendor/assets/bower_components/moment/min/moment.min.js',
           'vendor/assets/bower_components/sntools/dist/sntools.min.js',
           'vendor/assets/bower_components/lodash/dist/lodash.min.js',
           'vendor/assets/bower_components/restangular/dist/restangular.js',
           'vendor/assets/bower_components/dropzone/dist/min/dropzone.min.js'
         ],
         dest: 'vendor/assets/javascripts/lib.js',
       },

       dist: {
         src: ['vendor/assets/javascripts/lib.js', 'vendor/assets/javascripts/transpiled.js', 'vendor/assets/javascripts/templates.js'],
         dest: 'vendor/assets/javascripts/compiled.js',
       },
     },

     babel: {
          options: {
              sourceMap: true,
              presets: ['es2016']
          },
          dist: {
              files: {
                  'vendor/assets/javascripts/transpiled.js': 'vendor/assets/javascripts/app.js'
              }
          }
      },

      browserify: {
        dist: {
          files: {
            'vendor/assets/javascripts/transpiled.js': 'vendor/assets/javascripts/transpiled.js'
          },
          options: {
          }
        }
      },

     ngAnnotate: {
       options: {
          singleQuotes: true,
        },

        neeto: {
          files: {
            'vendor/assets/javascripts/compiled.js': 'vendor/assets/javascripts/compiled.js',
          },
        }
      },

     uglify: {
       compiled: {
         src: ['vendor/assets/javascripts/compiled.js'],
         dest: 'vendor/assets/javascripts/compiled.min.js'
       }
    }
  });

  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-haml2html');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-markdown');

  grunt.registerTask('default', [
    'haml', 'markdown', 'ngtemplates', 'sass', 'concat:app', 'babel', 'browserify',
    'concat:lib', 'concat:dist', 'ngAnnotate', 'uglify'
  ]);
};
