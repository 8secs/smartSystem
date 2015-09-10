(function () {
    'use strict';

    angular.module('Admin', ['ngResource',
            'ngTable',
            'ui.multiselect',
            'uiGmapgoogle-maps'
        ])
        .config(function(uiGmapGoogleMapApiProvider){
            uiGmapGoogleMapApiProvider.configure({
                key: 'AIzaSyCdwv6fBwKiwrRkV9E9qWWzqWjDuSucyQA',
                v: '3.17',
                libraries: 'weather,geometry,visualization'
            });

        })
        .config(function($stateProvider, $urlRouterProvider, $authProvider) {

            $stateProvider

                .state('admin',{
                    abstract: true,
                    resolve: {
                        authenticated: function($q, $location, $auth) {
                            var deferred = $q.defer();
                            if (!$auth.isAuthenticated()) {
                                //$location.path('/login');
                                console.log("noAuth");
                            } else {
                                deferred.resolve();
                            }
                            return deferred.promise;
                        }
                    },
                    views: {
                        '@' : {
                            templateUrl: 'themes/bootstrap/layouts/admin.html',
                            controller: 'layoutCtrl'
                        },
                        'header@admin': {
                            templateUrl: 'themes/bootstrap/includes/admin/header.html',
                            controller: 'NavbarCtrl'
                        },
                        'sidebar@admin': {
                            templateUrl: 'themes/bootstrap/includes/admin/sidebar.html',
                            controller: 'SidebarMenuCtrl'
                        },
                        'footer@admin': {
                            templateUrl: 'themes/bootstrap/includes/admin/footer.html'
                        },
                        'control@admin': {
                            templateUrl: 'themes/bootstrap/includes/admin/control-sidebar.html'
                        }
                    }
                })
                .state('dashboard',{
                    url: '/dashboard',
                    templateUrl: 'themes/bootstrap/partials/admin/dashboard.html',
                    controller: 'DashboardCtrl',
                    parent: 'admin'
                })
                .state('users', {
                    url: '/users',
                    templateUrl: 'themes/bootstrap/partials/admin/users.html',
                    controller: 'UserCtrl',
                    parent: 'admin'
                })
                .state('edit-user', {
                    url: '/edit-user/:userID/:editUser',
                    templateUrl: 'themes/bootstrap/partials/profile/profile.html',
                    controller: 'UserCtrl',
                    parent: 'admin'

                })
                .state('roles', {
                    url: '/roles',
                    templateUrl: 'themes/bootstrap/partials/admin/roles.html',
                    controller: 'RoleCtrl',
                    parent: 'admin'
                })
                .state('new-role', {
                    url: '/new-role',
                    templateUrl: 'themes/bootstrap/partials/admin/role.html',
                    parent: 'admin'
                })
                .state('edit-role', {
                    url: '/edit-role/:roleID/:editRole',
                    templateUrl: 'themes/bootstrap/partials/admin/role.html',
                    controller: 'RoleCtrl',
                    parent: 'admin'
                })
                .state('new-permission', {
                    url: '/new-permission',
                    templateUrl: 'themes/bootstrap/partials/admin/permission.html',
                    parent: 'admin'
                })
                .state('edit-permission', {
                    url: '/edit-permission/:permID/:editPerm',
                    templateUrl: 'themes/bootstrap/partials/admin/permission.html',
                    controller: 'RoleCtrl',
                    parent: 'admin'
                })
                .state('profile', {
                    url: '/profile',
                    templateUrl: 'themes/bootstrap/partials/profile/profile.html',
                    controller: 'ProfileCtrl',
                    parent: 'admin'
                });

            $urlRouterProvider.otherwise('/');

        });

})();
/**
 * Created by andres on 8/08/15.
 */

/*
 *
 * More info at [www.dropzonejs.com](http://www.dropzonejs.com)
 *
 * Copyright (c) 2012, Matias Meno
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */

(function() {
    var Dropzone, Emitter, camelize, contentLoaded, detectVerticalSquash, drawImageIOSFix, noop, without,
        __slice = [].slice,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

    noop = function() {};

    Emitter = (function() {
        function Emitter() {}

        Emitter.prototype.addEventListener = Emitter.prototype.on;

        Emitter.prototype.on = function(event, fn) {
            this._callbacks = this._callbacks || {};
            if (!this._callbacks[event]) {
                this._callbacks[event] = [];
            }
            this._callbacks[event].push(fn);
            return this;
        };

        Emitter.prototype.emit = function() {
            var args, callback, callbacks, event, _i, _len;
            event = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
            this._callbacks = this._callbacks || {};
            callbacks = this._callbacks[event];
            if (callbacks) {
                for (_i = 0, _len = callbacks.length; _i < _len; _i++) {
                    callback = callbacks[_i];
                    callback.apply(this, args);
                }
            }
            return this;
        };

        Emitter.prototype.removeListener = Emitter.prototype.off;

        Emitter.prototype.removeAllListeners = Emitter.prototype.off;

        Emitter.prototype.removeEventListener = Emitter.prototype.off;

        Emitter.prototype.off = function(event, fn) {
            var callback, callbacks, i, _i, _len;
            if (!this._callbacks || arguments.length === 0) {
                this._callbacks = {};
                return this;
            }
            callbacks = this._callbacks[event];
            if (!callbacks) {
                return this;
            }
            if (arguments.length === 1) {
                delete this._callbacks[event];
                return this;
            }
            for (i = _i = 0, _len = callbacks.length; _i < _len; i = ++_i) {
                callback = callbacks[i];
                if (callback === fn) {
                    callbacks.splice(i, 1);
                    break;
                }
            }
            return this;
        };

        return Emitter;

    })();

    Dropzone = (function(_super) {
        var extend, resolveOption;

        __extends(Dropzone, _super);

        Dropzone.prototype.Emitter = Emitter;


        /*
         This is a list of all available events you can register on a dropzone object.

         You can register an event handler like this:

         dropzone.on("dragEnter", function() { });
         */

        Dropzone.prototype.events = ["drop", "dragstart", "dragend", "dragenter", "dragover", "dragleave", "addedfile", "removedfile", "thumbnail", "error", "errormultiple", "processing", "processingmultiple", "uploadprogress", "totaluploadprogress", "sending", "sendingmultiple", "success", "successmultiple", "canceled", "canceledmultiple", "complete", "completemultiple", "reset", "maxfilesexceeded", "maxfilesreached", "queuecomplete"];

        Dropzone.prototype.defaultOptions = {
            url: null,
            method: "post",
            withCredentials: false,
            parallelUploads: 2,
            uploadMultiple: false,
            maxFilesize: 256,
            paramName: "file",
            createImageThumbnails: true,
            maxThumbnailFilesize: 10,
            thumbnailWidth: 120,
            thumbnailHeight: 120,
            filesizeBase: 1000,
            maxFiles: null,
            filesizeBase: 1000,
            params: {},
            clickable: true,
            ignoreHiddenFiles: true,
            acceptedFiles: null,
            acceptedMimeTypes: null,
            autoProcessQueue: true,
            autoQueue: true,
            addRemoveLinks: false,
            previewsContainer: null,
            capture: null,
            dictDefaultMessage: "Drop files here to upload",
            dictFallbackMessage: "Your browser does not support drag'n'drop file uploads.",
            dictFallbackText: "Please use the fallback form below to upload your files like in the olden days.",
            dictFileTooBig: "File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.",
            dictInvalidFileType: "You can't upload files of this type.",
            dictResponseError: "Server responded with {{statusCode}} code.",
            dictCancelUpload: "Cancel upload",
            dictCancelUploadConfirmation: "Are you sure you want to cancel this upload?",
            dictRemoveFile: "Remove file",
            dictRemoveFileConfirmation: null,
            dictMaxFilesExceeded: "You can not upload any more files.",
            accept: function(file, done) {
                return done();
            },
            init: function() {
                return noop;
            },
            forceFallback: false,
            fallback: function() {
                var child, messageElement, span, _i, _len, _ref;
                this.element.className = "" + this.element.className + " dz-browser-not-supported";
                _ref = this.element.getElementsByTagName("div");
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    child = _ref[_i];
                    if (/(^| )dz-message($| )/.test(child.className)) {
                        messageElement = child;
                        child.className = "dz-message";
                        continue;
                    }
                }
                if (!messageElement) {
                    messageElement = Dropzone.createElement("<div class=\"dz-message\"><span></span></div>");
                    this.element.appendChild(messageElement);
                }
                span = messageElement.getElementsByTagName("span")[0];
                if (span) {
                    span.textContent = this.options.dictFallbackMessage;
                }
                return this.element.appendChild(this.getFallbackForm());
            },
            resize: function(file) {
                var info, srcRatio, trgRatio;
                info = {
                    srcX: 0,
                    srcY: 0,
                    srcWidth: file.width,
                    srcHeight: file.height
                };
                srcRatio = file.width / file.height;
                info.optWidth = this.options.thumbnailWidth;
                info.optHeight = this.options.thumbnailHeight;
                if ((info.optWidth == null) && (info.optHeight == null)) {
                    info.optWidth = info.srcWidth;
                    info.optHeight = info.srcHeight;
                } else if (info.optWidth == null) {
                    info.optWidth = srcRatio * info.optHeight;
                } else if (info.optHeight == null) {
                    info.optHeight = (1 / srcRatio) * info.optWidth;
                }
                trgRatio = info.optWidth / info.optHeight;
                if (file.height < info.optHeight || file.width < info.optWidth) {
                    info.trgHeight = info.srcHeight;
                    info.trgWidth = info.srcWidth;
                } else {
                    if (srcRatio > trgRatio) {
                        info.srcHeight = file.height;
                        info.srcWidth = info.srcHeight * trgRatio;
                    } else {
                        info.srcWidth = file.width;
                        info.srcHeight = info.srcWidth / trgRatio;
                    }
                }
                info.srcX = (file.width - info.srcWidth) / 2;
                info.srcY = (file.height - info.srcHeight) / 2;
                return info;
            },

            /*
             Those functions register themselves to the events on init and handle all
             the user interface specific stuff. Overwriting them won't break the upload
             but can break the way it's displayed.
             You can overwrite them if you don't like the default behavior. If you just
             want to add an additional event handler, register it on the dropzone object
             and don't overwrite those options.
             */
            drop: function(e) {
                return this.element.classList.remove("dz-drag-hover");
            },
            dragstart: noop,
            dragend: function(e) {
                return this.element.classList.remove("dz-drag-hover");
            },
            dragenter: function(e) {
                return this.element.classList.add("dz-drag-hover");
            },
            dragover: function(e) {
                return this.element.classList.add("dz-drag-hover");
            },
            dragleave: function(e) {
                return this.element.classList.remove("dz-drag-hover");
            },
            paste: noop,
            reset: function() {
                return this.element.classList.remove("dz-started");
            },
            addedfile: function(file) {
                var node, removeFileEvent, removeLink, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2, _results;
                if (this.element === this.previewsContainer) {
                    this.element.classList.add("dz-started");
                }
                if (this.previewsContainer) {
                    file.previewElement = Dropzone.createElement(this.options.previewTemplate.trim());
                    file.previewTemplate = file.previewElement;
                    this.previewsContainer.appendChild(file.previewElement);
                    _ref = file.previewElement.querySelectorAll("[data-dz-name]");
                    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                        node = _ref[_i];
                        node.textContent = file.name;
                    }
                    _ref1 = file.previewElement.querySelectorAll("[data-dz-size]");
                    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                        node = _ref1[_j];
                        node.innerHTML = this.filesize(file.size);
                    }
                    if (this.options.addRemoveLinks) {
                        file._removeLink = Dropzone.createElement("<a class=\"dz-remove\" href=\"javascript:undefined;\" data-dz-remove>" + this.options.dictRemoveFile + "</a>");
                        file.previewElement.appendChild(file._removeLink);
                    }
                    removeFileEvent = (function(_this) {
                        return function(e) {
                            e.preventDefault();
                            e.stopPropagation();
                            if (file.status === Dropzone.UPLOADING) {
                                return Dropzone.confirm(_this.options.dictCancelUploadConfirmation, function() {
                                    return _this.removeFile(file);
                                });
                            } else {
                                if (_this.options.dictRemoveFileConfirmation) {
                                    return Dropzone.confirm(_this.options.dictRemoveFileConfirmation, function() {
                                        return _this.removeFile(file);
                                    });
                                } else {
                                    return _this.removeFile(file);
                                }
                            }
                        };
                    })(this);
                    _ref2 = file.previewElement.querySelectorAll("[data-dz-remove]");
                    _results = [];
                    for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
                        removeLink = _ref2[_k];
                        _results.push(removeLink.addEventListener("click", removeFileEvent));
                    }
                    return _results;
                }
            },
            removedfile: function(file) {
                var _ref;
                if (file.previewElement) {
                    if ((_ref = file.previewElement) != null) {
                        _ref.parentNode.removeChild(file.previewElement);
                    }
                }
                return this._updateMaxFilesReachedClass();
            },
            thumbnail: function(file, dataUrl) {
                var thumbnailElement, _i, _len, _ref;
                if (file.previewElement) {
                    file.previewElement.classList.remove("dz-file-preview");
                    _ref = file.previewElement.querySelectorAll("[data-dz-thumbnail]");
                    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                        thumbnailElement = _ref[_i];
                        thumbnailElement.alt = file.name;
                        thumbnailElement.src = dataUrl;
                    }
                    return setTimeout(((function(_this) {
                        return function() {
                            return file.previewElement.classList.add("dz-image-preview");
                        };
                    })(this)), 1);
                }
            },
            error: function(file, message) {
                var node, _i, _len, _ref, _results;
                if (file.previewElement) {
                    file.previewElement.classList.add("dz-error");
                    if (typeof message !== "String" && message.error) {
                        message = message.error;
                    }
                    _ref = file.previewElement.querySelectorAll("[data-dz-errormessage]");
                    _results = [];
                    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                        node = _ref[_i];
                        _results.push(node.textContent = message);
                    }
                    return _results;
                }
            },
            errormultiple: noop,
            processing: function(file) {
                if (file.previewElement) {
                    file.previewElement.classList.add("dz-processing");
                    if (file._removeLink) {
                        return file._removeLink.textContent = this.options.dictCancelUpload;
                    }
                }
            },
            processingmultiple: noop,
            uploadprogress: function(file, progress, bytesSent) {
                var node, _i, _len, _ref, _results;
                if (file.previewElement) {
                    _ref = file.previewElement.querySelectorAll("[data-dz-uploadprogress]");
                    _results = [];
                    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                        node = _ref[_i];
                        if (node.nodeName === 'PROGRESS') {
                            _results.push(node.value = progress);
                        } else {
                            _results.push(node.style.width = "" + progress + "%");
                        }
                    }
                    return _results;
                }
            },
            totaluploadprogress: noop,
            sending: noop,
            sendingmultiple: noop,
            success: function(file) {
                if (file.previewElement) {
                    return file.previewElement.classList.add("dz-success");
                }
            },
            successmultiple: noop,
            canceled: function(file) {
                return this.emit("error", file, "Upload canceled.");
            },
            canceledmultiple: noop,
            complete: function(file) {
                if (file._removeLink) {
                    file._removeLink.textContent = this.options.dictRemoveFile;
                }
                if (file.previewElement) {
                    return file.previewElement.classList.add("dz-complete");
                }
            },
            completemultiple: noop,
            maxfilesexceeded: noop,
            maxfilesreached: noop,
            queuecomplete: noop,
            previewTemplate: "<div class=\"dz-preview dz-file-preview\">\n  <div class=\"dz-image\"><img data-dz-thumbnail /></div>\n  <div class=\"dz-details\">\n    <div class=\"dz-size\"><span data-dz-size></span></div>\n    <div class=\"dz-filename\"><span data-dz-name></span></div>\n  </div>\n  <div class=\"dz-progress\"><span class=\"dz-upload\" data-dz-uploadprogress></span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n  <div class=\"dz-success-mark\">\n    <svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\">\n      <title>Check</title>\n      <defs></defs>\n      <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\">\n        <path d=\"M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\" id=\"Oval-2\" stroke-opacity=\"0.198794158\" stroke=\"#747474\" fill-opacity=\"0.816519475\" fill=\"#FFFFFF\" sketch:type=\"MSShapeGroup\"></path>\n      </g>\n    </svg>\n  </div>\n  <div class=\"dz-error-mark\">\n    <svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\">\n      <title>Error</title>\n      <defs></defs>\n      <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\">\n        <g id=\"Check-+-Oval-2\" sketch:type=\"MSLayerGroup\" stroke=\"#747474\" stroke-opacity=\"0.198794158\" fill=\"#FFFFFF\" fill-opacity=\"0.816519475\">\n          <path d=\"M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\" id=\"Oval-2\" sketch:type=\"MSShapeGroup\"></path>\n        </g>\n      </g>\n    </svg>\n  </div>\n</div>"
        };

        extend = function() {
            var key, object, objects, target, val, _i, _len;
            target = arguments[0], objects = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
            for (_i = 0, _len = objects.length; _i < _len; _i++) {
                object = objects[_i];
                for (key in object) {
                    val = object[key];
                    target[key] = val;
                }
            }
            return target;
        };

        function Dropzone(element, options) {
            var elementOptions, fallback, _ref;
            this.element = element;
            this.version = Dropzone.version;
            this.defaultOptions.previewTemplate = this.defaultOptions.previewTemplate.replace(/\n*/g, "");
            this.clickableElements = [];
            this.listeners = [];
            this.files = [];
            if (typeof this.element === "string") {
                this.element = document.querySelector(this.element);
            }
            if (!(this.element && (this.element.nodeType != null))) {
                throw new Error("Invalid dropzone element.");
            }
            if (this.element.dropzone) {
                throw new Error("Dropzone already attached.");
            }
            Dropzone.instances.push(this);
            this.element.dropzone = this;
            elementOptions = (_ref = Dropzone.optionsForElement(this.element)) != null ? _ref : {};
            this.options = extend({}, this.defaultOptions, elementOptions, options != null ? options : {});
            if (this.options.forceFallback || !Dropzone.isBrowserSupported()) {
                return this.options.fallback.call(this);
            }
            if (this.options.url == null) {
                this.options.url = this.element.getAttribute("action");
            }
            if (!this.options.url) {
                throw new Error("No URL provided.");
            }
            if (this.options.acceptedFiles && this.options.acceptedMimeTypes) {
                throw new Error("You can't provide both 'acceptedFiles' and 'acceptedMimeTypes'. 'acceptedMimeTypes' is deprecated.");
            }
            if (this.options.acceptedMimeTypes) {
                this.options.acceptedFiles = this.options.acceptedMimeTypes;
                delete this.options.acceptedMimeTypes;
            }
            this.options.method = this.options.method.toUpperCase();
            if ((fallback = this.getExistingFallback()) && fallback.parentNode) {
                fallback.parentNode.removeChild(fallback);
            }
            if (this.options.previewsContainer !== false) {
                if (this.options.previewsContainer) {
                    this.previewsContainer = Dropzone.getElement(this.options.previewsContainer, "previewsContainer");
                } else {
                    this.previewsContainer = this.element;
                }
            }
            if (this.options.clickable) {
                if (this.options.clickable === true) {
                    this.clickableElements = [this.element];
                } else {
                    this.clickableElements = Dropzone.getElements(this.options.clickable, "clickable");
                }
            }
            this.init();
        }

        Dropzone.prototype.getAcceptedFiles = function() {
            var file, _i, _len, _ref, _results;
            _ref = this.files;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                file = _ref[_i];
                if (file.accepted) {
                    _results.push(file);
                }
            }
            return _results;
        };

        Dropzone.prototype.getRejectedFiles = function() {
            var file, _i, _len, _ref, _results;
            _ref = this.files;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                file = _ref[_i];
                if (!file.accepted) {
                    _results.push(file);
                }
            }
            return _results;
        };

        Dropzone.prototype.getFilesWithStatus = function(status) {
            var file, _i, _len, _ref, _results;
            _ref = this.files;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                file = _ref[_i];
                if (file.status === status) {
                    _results.push(file);
                }
            }
            return _results;
        };

        Dropzone.prototype.getQueuedFiles = function() {
            return this.getFilesWithStatus(Dropzone.QUEUED);
        };

        Dropzone.prototype.getUploadingFiles = function() {
            return this.getFilesWithStatus(Dropzone.UPLOADING);
        };

        Dropzone.prototype.getActiveFiles = function() {
            var file, _i, _len, _ref, _results;
            _ref = this.files;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                file = _ref[_i];
                if (file.status === Dropzone.UPLOADING || file.status === Dropzone.QUEUED) {
                    _results.push(file);
                }
            }
            return _results;
        };

        Dropzone.prototype.init = function() {
            var eventName, noPropagation, setupHiddenFileInput, _i, _len, _ref, _ref1;
            if (this.element.tagName === "form") {
                this.element.setAttribute("enctype", "multipart/form-data");
            }
            if (this.element.classList.contains("dropzone") && !this.element.querySelector(".dz-message")) {
                this.element.appendChild(Dropzone.createElement("<div class=\"dz-default dz-message\"><span>" + this.options.dictDefaultMessage + "</span></div>"));
            }
            if (this.clickableElements.length) {
                setupHiddenFileInput = (function(_this) {
                    return function() {
                        if (_this.hiddenFileInput) {
                            document.body.removeChild(_this.hiddenFileInput);
                        }
                        _this.hiddenFileInput = document.createElement("input");
                        _this.hiddenFileInput.setAttribute("type", "file");
                        if ((_this.options.maxFiles == null) || _this.options.maxFiles > 1) {
                            _this.hiddenFileInput.setAttribute("multiple", "multiple");
                        }
                        _this.hiddenFileInput.className = "dz-hidden-input";
                        if (_this.options.acceptedFiles != null) {
                            _this.hiddenFileInput.setAttribute("accept", _this.options.acceptedFiles);
                        }
                        if (_this.options.capture != null) {
                            _this.hiddenFileInput.setAttribute("capture", _this.options.capture);
                        }
                        _this.hiddenFileInput.style.visibility = "hidden";
                        _this.hiddenFileInput.style.position = "absolute";
                        _this.hiddenFileInput.style.top = "0";
                        _this.hiddenFileInput.style.left = "0";
                        _this.hiddenFileInput.style.height = "0";
                        _this.hiddenFileInput.style.width = "0";
                        document.body.appendChild(_this.hiddenFileInput);
                        return _this.hiddenFileInput.addEventListener("change", function() {
                            var file, files, _i, _len;
                            files = _this.hiddenFileInput.files;
                            if (files.length) {
                                for (_i = 0, _len = files.length; _i < _len; _i++) {
                                    file = files[_i];
                                    _this.addFile(file);
                                }
                            }
                            return setupHiddenFileInput();
                        });
                    };
                })(this);
                setupHiddenFileInput();
            }
            this.URL = (_ref = window.URL) != null ? _ref : window.webkitURL;
            _ref1 = this.events;
            for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                eventName = _ref1[_i];
                this.on(eventName, this.options[eventName]);
            }
            this.on("uploadprogress", (function(_this) {
                return function() {
                    return _this.updateTotalUploadProgress();
                };
            })(this));
            this.on("removedfile", (function(_this) {
                return function() {
                    return _this.updateTotalUploadProgress();
                };
            })(this));
            this.on("canceled", (function(_this) {
                return function(file) {
                    return _this.emit("complete", file);
                };
            })(this));
            this.on("complete", (function(_this) {
                return function(file) {
                    if (_this.getUploadingFiles().length === 0 && _this.getQueuedFiles().length === 0) {
                        return setTimeout((function() {
                            return _this.emit("queuecomplete");
                        }), 0);
                    }
                };
            })(this));
            noPropagation = function(e) {
                e.stopPropagation();
                if (e.preventDefault) {
                    return e.preventDefault();
                } else {
                    return e.returnValue = false;
                }
            };
            this.listeners = [
                {
                    element: this.element,
                    events: {
                        "dragstart": (function(_this) {
                            return function(e) {
                                return _this.emit("dragstart", e);
                            };
                        })(this),
                        "dragenter": (function(_this) {
                            return function(e) {
                                noPropagation(e);
                                return _this.emit("dragenter", e);
                            };
                        })(this),
                        "dragover": (function(_this) {
                            return function(e) {
                                var efct;
                                try {
                                    efct = e.dataTransfer.effectAllowed;
                                } catch (_error) {}
                                e.dataTransfer.dropEffect = 'move' === efct || 'linkMove' === efct ? 'move' : 'copy';
                                noPropagation(e);
                                return _this.emit("dragover", e);
                            };
                        })(this),
                        "dragleave": (function(_this) {
                            return function(e) {
                                return _this.emit("dragleave", e);
                            };
                        })(this),
                        "drop": (function(_this) {
                            return function(e) {
                                noPropagation(e);
                                return _this.drop(e);
                            };
                        })(this),
                        "dragend": (function(_this) {
                            return function(e) {
                                return _this.emit("dragend", e);
                            };
                        })(this)
                    }
                }
            ];
            this.clickableElements.forEach((function(_this) {
                return function(clickableElement) {
                    return _this.listeners.push({
                        element: clickableElement,
                        events: {
                            "click": function(evt) {
                                if ((clickableElement !== _this.element) || (evt.target === _this.element || Dropzone.elementInside(evt.target, _this.element.querySelector(".dz-message")))) {
                                    return _this.hiddenFileInput.click();
                                }
                            }
                        }
                    });
                };
            })(this));
            this.enable();
            return this.options.init.call(this);
        };

        Dropzone.prototype.destroy = function() {
            var _ref;
            this.disable();
            this.removeAllFiles(true);
            if ((_ref = this.hiddenFileInput) != null ? _ref.parentNode : void 0) {
                this.hiddenFileInput.parentNode.removeChild(this.hiddenFileInput);
                this.hiddenFileInput = null;
            }
            delete this.element.dropzone;
            return Dropzone.instances.splice(Dropzone.instances.indexOf(this), 1);
        };

        Dropzone.prototype.updateTotalUploadProgress = function() {
            var activeFiles, file, totalBytes, totalBytesSent, totalUploadProgress, _i, _len, _ref;
            totalBytesSent = 0;
            totalBytes = 0;
            activeFiles = this.getActiveFiles();
            if (activeFiles.length) {
                _ref = this.getActiveFiles();
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    file = _ref[_i];
                    totalBytesSent += file.upload.bytesSent;
                    totalBytes += file.upload.total;
                }
                totalUploadProgress = 100 * totalBytesSent / totalBytes;
            } else {
                totalUploadProgress = 100;
            }
            return this.emit("totaluploadprogress", totalUploadProgress, totalBytes, totalBytesSent);
        };

        Dropzone.prototype._getParamName = function(n) {
            if (typeof this.options.paramName === "function") {
                return this.options.paramName(n);
            } else {
                return "" + this.options.paramName + (this.options.uploadMultiple ? "[" + n + "]" : "");
            }
        };

        Dropzone.prototype.getFallbackForm = function() {
            var existingFallback, fields, fieldsString, form;
            if (existingFallback = this.getExistingFallback()) {
                return existingFallback;
            }
            fieldsString = "<div class=\"dz-fallback\">";
            if (this.options.dictFallbackText) {
                fieldsString += "<p>" + this.options.dictFallbackText + "</p>";
            }
            fieldsString += "<input type=\"file\" name=\"" + (this._getParamName(0)) + "\" " + (this.options.uploadMultiple ? 'multiple="multiple"' : void 0) + " /><input type=\"submit\" value=\"Upload!\"></div>";
            fields = Dropzone.createElement(fieldsString);
            if (this.element.tagName !== "FORM") {
                form = Dropzone.createElement("<form action=\"" + this.options.url + "\" enctype=\"multipart/form-data\" method=\"" + this.options.method + "\"></form>");
                form.appendChild(fields);
            } else {
                this.element.setAttribute("enctype", "multipart/form-data");
                this.element.setAttribute("method", this.options.method);
            }
            return form != null ? form : fields;
        };

        Dropzone.prototype.getExistingFallback = function() {
            var fallback, getFallback, tagName, _i, _len, _ref;
            getFallback = function(elements) {
                var el, _i, _len;
                for (_i = 0, _len = elements.length; _i < _len; _i++) {
                    el = elements[_i];
                    if (/(^| )fallback($| )/.test(el.className)) {
                        return el;
                    }
                }
            };
            _ref = ["div", "form"];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                tagName = _ref[_i];
                if (fallback = getFallback(this.element.getElementsByTagName(tagName))) {
                    return fallback;
                }
            }
        };

        Dropzone.prototype.setupEventListeners = function() {
            var elementListeners, event, listener, _i, _len, _ref, _results;
            _ref = this.listeners;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                elementListeners = _ref[_i];
                _results.push((function() {
                    var _ref1, _results1;
                    _ref1 = elementListeners.events;
                    _results1 = [];
                    for (event in _ref1) {
                        listener = _ref1[event];
                        _results1.push(elementListeners.element.addEventListener(event, listener, false));
                    }
                    return _results1;
                })());
            }
            return _results;
        };

        Dropzone.prototype.removeEventListeners = function() {
            var elementListeners, event, listener, _i, _len, _ref, _results;
            _ref = this.listeners;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                elementListeners = _ref[_i];
                _results.push((function() {
                    var _ref1, _results1;
                    _ref1 = elementListeners.events;
                    _results1 = [];
                    for (event in _ref1) {
                        listener = _ref1[event];
                        _results1.push(elementListeners.element.removeEventListener(event, listener, false));
                    }
                    return _results1;
                })());
            }
            return _results;
        };

        Dropzone.prototype.disable = function() {
            var file, _i, _len, _ref, _results;
            this.clickableElements.forEach(function(element) {
                return element.classList.remove("dz-clickable");
            });
            this.removeEventListeners();
            _ref = this.files;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                file = _ref[_i];
                _results.push(this.cancelUpload(file));
            }
            return _results;
        };

        Dropzone.prototype.enable = function() {
            this.clickableElements.forEach(function(element) {
                return element.classList.add("dz-clickable");
            });
            return this.setupEventListeners();
        };

        Dropzone.prototype.filesize = function(size) {
            var cutoff, i, selectedSize, selectedUnit, unit, units, _i, _len;
            units = ['TB', 'GB', 'MB', 'KB', 'b'];
            selectedSize = selectedUnit = null;
            for (i = _i = 0, _len = units.length; _i < _len; i = ++_i) {
                unit = units[i];
                cutoff = Math.pow(this.options.filesizeBase, 4 - i) / 10;
                if (size >= cutoff) {
                    selectedSize = size / Math.pow(this.options.filesizeBase, 4 - i);
                    selectedUnit = unit;
                    break;
                }
            }
            selectedSize = Math.round(10 * selectedSize) / 10;
            return "<strong>" + selectedSize + "</strong> " + selectedUnit;
        };

        Dropzone.prototype._updateMaxFilesReachedClass = function() {
            if ((this.options.maxFiles != null) && this.getAcceptedFiles().length >= this.options.maxFiles) {
                if (this.getAcceptedFiles().length === this.options.maxFiles) {
                    this.emit('maxfilesreached', this.files);
                }
                return this.element.classList.add("dz-max-files-reached");
            } else {
                return this.element.classList.remove("dz-max-files-reached");
            }
        };

        Dropzone.prototype.drop = function(e) {
            var files, items;
            if (!e.dataTransfer) {
                return;
            }
            this.emit("drop", e);
            files = e.dataTransfer.files;
            if (files.length) {
                items = e.dataTransfer.items;
                if (items && items.length && (items[0].webkitGetAsEntry != null)) {
                    this._addFilesFromItems(items);
                } else {
                    this.handleFiles(files);
                }
            }
        };

        Dropzone.prototype.paste = function(e) {
            var items, _ref;
            if ((e != null ? (_ref = e.clipboardData) != null ? _ref.items : void 0 : void 0) == null) {
                return;
            }
            this.emit("paste", e);
            items = e.clipboardData.items;
            if (items.length) {
                return this._addFilesFromItems(items);
            }
        };

        Dropzone.prototype.handleFiles = function(files) {
            var file, _i, _len, _results;
            _results = [];
            for (_i = 0, _len = files.length; _i < _len; _i++) {
                file = files[_i];
                _results.push(this.addFile(file));
            }
            return _results;
        };

        Dropzone.prototype._addFilesFromItems = function(items) {
            var entry, item, _i, _len, _results;
            _results = [];
            for (_i = 0, _len = items.length; _i < _len; _i++) {
                item = items[_i];
                if ((item.webkitGetAsEntry != null) && (entry = item.webkitGetAsEntry())) {
                    if (entry.isFile) {
                        _results.push(this.addFile(item.getAsFile()));
                    } else if (entry.isDirectory) {
                        _results.push(this._addFilesFromDirectory(entry, entry.name));
                    } else {
                        _results.push(void 0);
                    }
                } else if (item.getAsFile != null) {
                    if ((item.kind == null) || item.kind === "file") {
                        _results.push(this.addFile(item.getAsFile()));
                    } else {
                        _results.push(void 0);
                    }
                } else {
                    _results.push(void 0);
                }
            }
            return _results;
        };

        Dropzone.prototype._addFilesFromDirectory = function(directory, path) {
            var dirReader, entriesReader;
            dirReader = directory.createReader();
            entriesReader = (function(_this) {
                return function(entries) {
                    var entry, _i, _len;
                    for (_i = 0, _len = entries.length; _i < _len; _i++) {
                        entry = entries[_i];
                        if (entry.isFile) {
                            entry.file(function(file) {
                                if (_this.options.ignoreHiddenFiles && file.name.substring(0, 1) === '.') {
                                    return;
                                }
                                file.fullPath = "" + path + "/" + file.name;
                                return _this.addFile(file);
                            });
                        } else if (entry.isDirectory) {
                            _this._addFilesFromDirectory(entry, "" + path + "/" + entry.name);
                        }
                    }
                };
            })(this);
            return dirReader.readEntries(entriesReader, function(error) {
                return typeof console !== "undefined" && console !== null ? typeof console.log === "function" ? console.log(error) : void 0 : void 0;
            });
        };

        Dropzone.prototype.accept = function(file, done) {
            if (file.size > this.options.maxFilesize * 1024 * 1024) {
                return done(this.options.dictFileTooBig.replace("{{filesize}}", Math.round(file.size / 1024 / 10.24) / 100).replace("{{maxFilesize}}", this.options.maxFilesize));
            } else if (!Dropzone.isValidFile(file, this.options.acceptedFiles)) {
                return done(this.options.dictInvalidFileType);
            } else if ((this.options.maxFiles != null) && this.getAcceptedFiles().length >= this.options.maxFiles) {
                done(this.options.dictMaxFilesExceeded.replace("{{maxFiles}}", this.options.maxFiles));
                return this.emit("maxfilesexceeded", file);
            } else {
                return this.options.accept.call(this, file, done);
            }
        };

        Dropzone.prototype.addFile = function(file) {
            file.upload = {
                progress: 0,
                total: file.size,
                bytesSent: 0
            };
            this.files.push(file);
            file.status = Dropzone.ADDED;
            this.emit("addedfile", file);
            this._enqueueThumbnail(file);
            return this.accept(file, (function(_this) {
                return function(error) {
                    if (error) {
                        file.accepted = false;
                        _this._errorProcessing([file], error);
                    } else {
                        file.accepted = true;
                        if (_this.options.autoQueue) {
                            _this.enqueueFile(file);
                        }
                    }
                    return _this._updateMaxFilesReachedClass();
                };
            })(this));
        };

        Dropzone.prototype.enqueueFiles = function(files) {
            var file, _i, _len;
            for (_i = 0, _len = files.length; _i < _len; _i++) {
                file = files[_i];
                this.enqueueFile(file);
            }
            return null;
        };

        Dropzone.prototype.enqueueFile = function(file) {
            if (file.status === Dropzone.ADDED && file.accepted === true) {
                file.status = Dropzone.QUEUED;
                if (this.options.autoProcessQueue) {
                    return setTimeout(((function(_this) {
                        return function() {
                            return _this.processQueue();
                        };
                    })(this)), 0);
                }
            } else {
                throw new Error("This file can't be queued because it has already been processed or was rejected.");
            }
        };

        Dropzone.prototype._thumbnailQueue = [];

        Dropzone.prototype._processingThumbnail = false;

        Dropzone.prototype._enqueueThumbnail = function(file) {
            if (this.options.createImageThumbnails && file.type.match(/image.*/) && file.size <= this.options.maxThumbnailFilesize * 1024 * 1024) {
                this._thumbnailQueue.push(file);
                return setTimeout(((function(_this) {
                    return function() {
                        return _this._processThumbnailQueue();
                    };
                })(this)), 0);
            }
        };

        Dropzone.prototype._processThumbnailQueue = function() {
            if (this._processingThumbnail || this._thumbnailQueue.length === 0) {
                return;
            }
            this._processingThumbnail = true;
            return this.createThumbnail(this._thumbnailQueue.shift(), (function(_this) {
                return function() {
                    _this._processingThumbnail = false;
                    return _this._processThumbnailQueue();
                };
            })(this));
        };

        Dropzone.prototype.removeFile = function(file) {
            if (file.status === Dropzone.UPLOADING) {
                this.cancelUpload(file);
            }
            this.files = without(this.files, file);
            this.emit("removedfile", file);
            if (this.files.length === 0) {
                return this.emit("reset");
            }
        };

        Dropzone.prototype.removeAllFiles = function(cancelIfNecessary) {
            var file, _i, _len, _ref;
            if (cancelIfNecessary == null) {
                cancelIfNecessary = false;
            }
            _ref = this.files.slice();
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                file = _ref[_i];
                if (file.status !== Dropzone.UPLOADING || cancelIfNecessary) {
                    this.removeFile(file);
                }
            }
            return null;
        };

        Dropzone.prototype.createThumbnail = function(file, callback) {
            var fileReader;
            fileReader = new FileReader;
            fileReader.onload = (function(_this) {
                return function() {
                    if (file.type === "image/svg+xml") {
                        _this.emit("thumbnail", file, fileReader.result);
                        if (callback != null) {
                            callback();
                        }
                        return;
                    }
                    return _this.createThumbnailFromUrl(file, fileReader.result, callback);
                };
            })(this);
            return fileReader.readAsDataURL(file);
        };

        Dropzone.prototype.createThumbnailFromUrl = function(file, imageUrl, callback) {
            var img;
            img = document.createElement("img");
            img.onload = (function(_this) {
                return function() {
                    var canvas, ctx, resizeInfo, thumbnail, _ref, _ref1, _ref2, _ref3;
                    file.width = img.width;
                    file.height = img.height;
                    resizeInfo = _this.options.resize.call(_this, file);
                    if (resizeInfo.trgWidth == null) {
                        resizeInfo.trgWidth = resizeInfo.optWidth;
                    }
                    if (resizeInfo.trgHeight == null) {
                        resizeInfo.trgHeight = resizeInfo.optHeight;
                    }
                    canvas = document.createElement("canvas");
                    ctx = canvas.getContext("2d");
                    canvas.width = resizeInfo.trgWidth;
                    canvas.height = resizeInfo.trgHeight;
                    drawImageIOSFix(ctx, img, (_ref = resizeInfo.srcX) != null ? _ref : 0, (_ref1 = resizeInfo.srcY) != null ? _ref1 : 0, resizeInfo.srcWidth, resizeInfo.srcHeight, (_ref2 = resizeInfo.trgX) != null ? _ref2 : 0, (_ref3 = resizeInfo.trgY) != null ? _ref3 : 0, resizeInfo.trgWidth, resizeInfo.trgHeight);
                    thumbnail = canvas.toDataURL("image/png");
                    _this.emit("thumbnail", file, thumbnail);
                    if (callback != null) {
                        return callback();
                    }
                };
            })(this);
            if (callback != null) {
                img.onerror = callback;
            }
            return img.src = imageUrl;
        };

        Dropzone.prototype.processQueue = function() {
            var i, parallelUploads, processingLength, queuedFiles;
            parallelUploads = this.options.parallelUploads;
            processingLength = this.getUploadingFiles().length;
            i = processingLength;
            if (processingLength >= parallelUploads) {
                return;
            }
            queuedFiles = this.getQueuedFiles();
            if (!(queuedFiles.length > 0)) {
                return;
            }
            if (this.options.uploadMultiple) {
                return this.processFiles(queuedFiles.slice(0, parallelUploads - processingLength));
            } else {
                while (i < parallelUploads) {
                    if (!queuedFiles.length) {
                        return;
                    }
                    this.processFile(queuedFiles.shift());
                    i++;
                }
            }
        };

        Dropzone.prototype.processFile = function(file) {
            return this.processFiles([file]);
        };

        Dropzone.prototype.processFiles = function(files) {
            var file, _i, _len;
            for (_i = 0, _len = files.length; _i < _len; _i++) {
                file = files[_i];
                file.processing = true;
                file.status = Dropzone.UPLOADING;
                this.emit("processing", file);
            }
            if (this.options.uploadMultiple) {
                this.emit("processingmultiple", files);
            }
            return this.uploadFiles(files);
        };

        Dropzone.prototype._getFilesWithXhr = function(xhr) {
            var file, files;
            return files = (function() {
                var _i, _len, _ref, _results;
                _ref = this.files;
                _results = [];
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    file = _ref[_i];
                    if (file.xhr === xhr) {
                        _results.push(file);
                    }
                }
                return _results;
            }).call(this);
        };

        Dropzone.prototype.cancelUpload = function(file) {
            var groupedFile, groupedFiles, _i, _j, _len, _len1, _ref;
            if (file.status === Dropzone.UPLOADING) {
                groupedFiles = this._getFilesWithXhr(file.xhr);
                for (_i = 0, _len = groupedFiles.length; _i < _len; _i++) {
                    groupedFile = groupedFiles[_i];
                    groupedFile.status = Dropzone.CANCELED;
                }
                file.xhr.abort();
                for (_j = 0, _len1 = groupedFiles.length; _j < _len1; _j++) {
                    groupedFile = groupedFiles[_j];
                    this.emit("canceled", groupedFile);
                }
                if (this.options.uploadMultiple) {
                    this.emit("canceledmultiple", groupedFiles);
                }
            } else if ((_ref = file.status) === Dropzone.ADDED || _ref === Dropzone.QUEUED) {
                file.status = Dropzone.CANCELED;
                this.emit("canceled", file);
                if (this.options.uploadMultiple) {
                    this.emit("canceledmultiple", [file]);
                }
            }
            if (this.options.autoProcessQueue) {
                return this.processQueue();
            }
        };

        resolveOption = function() {
            var args, option;
            option = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
            if (typeof option === 'function') {
                return option.apply(this, args);
            }
            return option;
        };

        Dropzone.prototype.uploadFile = function(file) {
            return this.uploadFiles([file]);
        };

        Dropzone.prototype.uploadFiles = function(files) {
            var file, formData, handleError, headerName, headerValue, headers, i, input, inputName, inputType, key, method, option, progressObj, response, updateProgress, url, value, xhr, _i, _j, _k, _l, _len, _len1, _len2, _len3, _m, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
            xhr = new XMLHttpRequest();
            for (_i = 0, _len = files.length; _i < _len; _i++) {
                file = files[_i];
                file.xhr = xhr;
            }
            method = resolveOption(this.options.method, files);
            url = resolveOption(this.options.url, files);
            xhr.open(method, url, true);
            xhr.withCredentials = !!this.options.withCredentials;
            response = null;
            handleError = (function(_this) {
                return function() {
                    var _j, _len1, _results;
                    _results = [];
                    for (_j = 0, _len1 = files.length; _j < _len1; _j++) {
                        file = files[_j];
                        _results.push(_this._errorProcessing(files, response || _this.options.dictResponseError.replace("{{statusCode}}", xhr.status), xhr));
                    }
                    return _results;
                };
            })(this);
            updateProgress = (function(_this) {
                return function(e) {
                    var allFilesFinished, progress, _j, _k, _l, _len1, _len2, _len3, _results;
                    if (e != null) {
                        progress = 100 * e.loaded / e.total;
                        for (_j = 0, _len1 = files.length; _j < _len1; _j++) {
                            file = files[_j];
                            file.upload = {
                                progress: progress,
                                total: e.total,
                                bytesSent: e.loaded
                            };
                        }
                    } else {
                        allFilesFinished = true;
                        progress = 100;
                        for (_k = 0, _len2 = files.length; _k < _len2; _k++) {
                            file = files[_k];
                            if (!(file.upload.progress === 100 && file.upload.bytesSent === file.upload.total)) {
                                allFilesFinished = false;
                            }
                            file.upload.progress = progress;
                            file.upload.bytesSent = file.upload.total;
                        }
                        if (allFilesFinished) {
                            return;
                        }
                    }
                    _results = [];
                    for (_l = 0, _len3 = files.length; _l < _len3; _l++) {
                        file = files[_l];
                        _results.push(_this.emit("uploadprogress", file, progress, file.upload.bytesSent));
                    }
                    return _results;
                };
            })(this);
            xhr.onload = (function(_this) {
                return function(e) {
                    var _ref;
                    if (files[0].status === Dropzone.CANCELED) {
                        return;
                    }
                    if (xhr.readyState !== 4) {
                        return;
                    }
                    response = xhr.responseText;
                    if (xhr.getResponseHeader("content-type") && ~xhr.getResponseHeader("content-type").indexOf("application/json")) {
                        try {
                            response = JSON.parse(response);
                        } catch (_error) {
                            e = _error;
                            response = "Invalid JSON response from server.";
                        }
                    }
                    updateProgress();
                    if (!((200 <= (_ref = xhr.status) && _ref < 300))) {
                        return handleError();
                    } else {
                        return _this._finished(files, response, e);
                    }
                };
            })(this);
            xhr.onerror = (function(_this) {
                return function() {
                    if (files[0].status === Dropzone.CANCELED) {
                        return;
                    }
                    return handleError();
                };
            })(this);
            progressObj = (_ref = xhr.upload) != null ? _ref : xhr;
            progressObj.onprogress = updateProgress;
            headers = {
                "Accept": "application/json",
                "Cache-Control": "no-cache",
                "X-Requested-With": "XMLHttpRequest"
            };
            if (this.options.headers) {
                extend(headers, this.options.headers);
            }
            for (headerName in headers) {
                headerValue = headers[headerName];
                xhr.setRequestHeader(headerName, headerValue);
            }
            formData = new FormData();
            if (this.options.params) {
                _ref1 = this.options.params;
                for (key in _ref1) {
                    value = _ref1[key];
                    formData.append(key, value);
                }
            }
            for (_j = 0, _len1 = files.length; _j < _len1; _j++) {
                file = files[_j];
                this.emit("sending", file, xhr, formData);
            }
            if (this.options.uploadMultiple) {
                this.emit("sendingmultiple", files, xhr, formData);
            }
            if (this.element.tagName === "FORM") {
                _ref2 = this.element.querySelectorAll("input, textarea, select, button");
                for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
                    input = _ref2[_k];
                    inputName = input.getAttribute("name");
                    inputType = input.getAttribute("type");
                    if (input.tagName === "SELECT" && input.hasAttribute("multiple")) {
                        _ref3 = input.options;
                        for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
                            option = _ref3[_l];
                            if (option.selected) {
                                formData.append(inputName, option.value);
                            }
                        }
                    } else if (!inputType || ((_ref4 = inputType.toLowerCase()) !== "checkbox" && _ref4 !== "radio") || input.checked) {
                        formData.append(inputName, input.value);
                    }
                }
            }
            for (i = _m = 0, _ref5 = files.length - 1; 0 <= _ref5 ? _m <= _ref5 : _m >= _ref5; i = 0 <= _ref5 ? ++_m : --_m) {
                formData.append(this._getParamName(i), files[i], files[i].name);
            }
            return xhr.send(formData);
        };

        Dropzone.prototype._finished = function(files, responseText, e) {
            var file, _i, _len;
            for (_i = 0, _len = files.length; _i < _len; _i++) {
                file = files[_i];
                file.status = Dropzone.SUCCESS;
                this.emit("success", file, responseText, e);
                this.emit("complete", file);
            }
            if (this.options.uploadMultiple) {
                this.emit("successmultiple", files, responseText, e);
                this.emit("completemultiple", files);
            }
            if (this.options.autoProcessQueue) {
                return this.processQueue();
            }
        };

        Dropzone.prototype._errorProcessing = function(files, message, xhr) {
            var file, _i, _len;
            for (_i = 0, _len = files.length; _i < _len; _i++) {
                file = files[_i];
                file.status = Dropzone.ERROR;
                this.emit("error", file, message, xhr);
                this.emit("complete", file);
            }
            if (this.options.uploadMultiple) {
                this.emit("errormultiple", files, message, xhr);
                this.emit("completemultiple", files);
            }
            if (this.options.autoProcessQueue) {
                return this.processQueue();
            }
        };

        return Dropzone;

    })(Emitter);

    Dropzone.version = "4.0.1";

    Dropzone.options = {};

    Dropzone.optionsForElement = function(element) {
        if (element.getAttribute("id")) {
            return Dropzone.options[camelize(element.getAttribute("id"))];
        } else {
            return void 0;
        }
    };

    Dropzone.instances = [];

    Dropzone.forElement = function(element) {
        if (typeof element === "string") {
            element = document.querySelector(element);
        }
        if ((element != null ? element.dropzone : void 0) == null) {
            throw new Error("No Dropzone found for given element. This is probably because you're trying to access it before Dropzone had the time to initialize. Use the `init` option to setup any additional observers on your Dropzone.");
        }
        return element.dropzone;
    };

    Dropzone.autoDiscover = true;

    Dropzone.discover = function() {
        var checkElements, dropzone, dropzones, _i, _len, _results;
        if (document.querySelectorAll) {
            dropzones = document.querySelectorAll(".dropzone");
        } else {
            dropzones = [];
            checkElements = function(elements) {
                var el, _i, _len, _results;
                _results = [];
                for (_i = 0, _len = elements.length; _i < _len; _i++) {
                    el = elements[_i];
                    if (/(^| )dropzone($| )/.test(el.className)) {
                        _results.push(dropzones.push(el));
                    } else {
                        _results.push(void 0);
                    }
                }
                return _results;
            };
            checkElements(document.getElementsByTagName("div"));
            checkElements(document.getElementsByTagName("form"));
        }
        _results = [];
        for (_i = 0, _len = dropzones.length; _i < _len; _i++) {
            dropzone = dropzones[_i];
            if (Dropzone.optionsForElement(dropzone) !== false) {
                _results.push(new Dropzone(dropzone));
            } else {
                _results.push(void 0);
            }
        }
        return _results;
    };

    Dropzone.blacklistedBrowsers = [/opera.*Macintosh.*version\/12/i];

    Dropzone.isBrowserSupported = function() {
        var capableBrowser, regex, _i, _len, _ref;
        capableBrowser = true;
        if (window.File && window.FileReader && window.FileList && window.Blob && window.FormData && document.querySelector) {
            if (!("classList" in document.createElement("a"))) {
                capableBrowser = false;
            } else {
                _ref = Dropzone.blacklistedBrowsers;
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    regex = _ref[_i];
                    if (regex.test(navigator.userAgent)) {
                        capableBrowser = false;
                        continue;
                    }
                }
            }
        } else {
            capableBrowser = false;
        }
        return capableBrowser;
    };

    without = function(list, rejectedItem) {
        var item, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = list.length; _i < _len; _i++) {
            item = list[_i];
            if (item !== rejectedItem) {
                _results.push(item);
            }
        }
        return _results;
    };

    camelize = function(str) {
        return str.replace(/[\-_](\w)/g, function(match) {
            return match.charAt(1).toUpperCase();
        });
    };

    Dropzone.createElement = function(string) {
        var div;
        div = document.createElement("div");
        div.innerHTML = string;
        return div.childNodes[0];
    };

    Dropzone.elementInside = function(element, container) {
        if (element === container) {
            return true;
        }
        while (element = element.parentNode) {
            if (element === container) {
                return true;
            }
        }
        return false;
    };

    Dropzone.getElement = function(el, name) {
        var element;
        if (typeof el === "string") {
            element = document.querySelector(el);
        } else if (el.nodeType != null) {
            element = el;
        }
        if (element == null) {
            throw new Error("Invalid `" + name + "` option provided. Please provide a CSS selector or a plain HTML element.");
        }
        return element;
    };

    Dropzone.getElements = function(els, name) {
        var e, el, elements, _i, _j, _len, _len1, _ref;
        if (els instanceof Array) {
            elements = [];
            try {
                for (_i = 0, _len = els.length; _i < _len; _i++) {
                    el = els[_i];
                    elements.push(this.getElement(el, name));
                }
            } catch (_error) {
                e = _error;
                elements = null;
            }
        } else if (typeof els === "string") {
            elements = [];
            _ref = document.querySelectorAll(els);
            for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
                el = _ref[_j];
                elements.push(el);
            }
        } else if (els.nodeType != null) {
            elements = [els];
        }
        if (!((elements != null) && elements.length)) {
            throw new Error("Invalid `" + name + "` option provided. Please provide a CSS selector, a plain HTML element or a list of those.");
        }
        return elements;
    };

    Dropzone.confirm = function(question, accepted, rejected) {
        if (window.confirm(question)) {
            return accepted();
        } else if (rejected != null) {
            return rejected();
        }
    };

    Dropzone.isValidFile = function(file, acceptedFiles) {
        var baseMimeType, mimeType, validType, _i, _len;
        if (!acceptedFiles) {
            return true;
        }
        acceptedFiles = acceptedFiles.split(",");
        mimeType = file.type;
        baseMimeType = mimeType.replace(/\/.*$/, "");
        for (_i = 0, _len = acceptedFiles.length; _i < _len; _i++) {
            validType = acceptedFiles[_i];
            validType = validType.trim();
            if (validType.charAt(0) === ".") {
                if (file.name.toLowerCase().indexOf(validType.toLowerCase(), file.name.length - validType.length) !== -1) {
                    return true;
                }
            } else if (/\/\*$/.test(validType)) {
                if (baseMimeType === validType.replace(/\/.*$/, "")) {
                    return true;
                }
            } else {
                if (mimeType === validType) {
                    return true;
                }
            }
        }
        return false;
    };

    if (typeof jQuery !== "undefined" && jQuery !== null) {
        jQuery.fn.dropzone = function(options) {
            return this.each(function() {
                return new Dropzone(this, options);
            });
        };
    }

    if (typeof module !== "undefined" && module !== null) {
        module.exports = Dropzone;
    } else {
        window.Dropzone = Dropzone;
    }

    Dropzone.ADDED = "added";

    Dropzone.QUEUED = "queued";

    Dropzone.ACCEPTED = Dropzone.QUEUED;

    Dropzone.UPLOADING = "uploading";

    Dropzone.PROCESSING = Dropzone.UPLOADING;

    Dropzone.CANCELED = "canceled";

    Dropzone.ERROR = "error";

    Dropzone.SUCCESS = "success";


    /*

     Bugfix for iOS 6 and 7
     Source: http://stackoverflow.com/questions/11929099/html5-canvas-drawimage-ratio-bug-ios
     based on the work of https://github.com/stomita/ios-imagefile-megapixel
     */

    detectVerticalSquash = function(img) {
        var alpha, canvas, ctx, data, ey, ih, iw, py, ratio, sy;
        iw = img.naturalWidth;
        ih = img.naturalHeight;
        canvas = document.createElement("canvas");
        canvas.width = 1;
        canvas.height = ih;
        ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        data = ctx.getImageData(0, 0, 1, ih).data;
        sy = 0;
        ey = ih;
        py = ih;
        while (py > sy) {
            alpha = data[(py - 1) * 4 + 3];
            if (alpha === 0) {
                ey = py;
            } else {
                sy = py;
            }
            py = (ey + sy) >> 1;
        }
        ratio = py / ih;
        if (ratio === 0) {
            return 1;
        } else {
            return ratio;
        }
    };

    drawImageIOSFix = function(ctx, img, sx, sy, sw, sh, dx, dy, dw, dh) {
        var vertSquashRatio;
        vertSquashRatio = detectVerticalSquash(img);
        return ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh / vertSquashRatio);
    };


    /*
     * contentloaded.js
     *
     * Author: Diego Perini (diego.perini at gmail.com)
     * Summary: cross-browser wrapper for DOMContentLoaded
     * Updated: 20101020
     * License: MIT
     * Version: 1.2
     *
     * URL:
     * http://javascript.nwbox.com/ContentLoaded/
     * http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE
     */

    contentLoaded = function(win, fn) {
        var add, doc, done, init, poll, pre, rem, root, top;
        done = false;
        top = true;
        doc = win.document;
        root = doc.documentElement;
        add = (doc.addEventListener ? "addEventListener" : "attachEvent");
        rem = (doc.addEventListener ? "removeEventListener" : "detachEvent");
        pre = (doc.addEventListener ? "" : "on");
        init = function(e) {
            if (e.type === "readystatechange" && doc.readyState !== "complete") {
                return;
            }
            (e.type === "load" ? win : doc)[rem](pre + e.type, init, false);
            if (!done && (done = true)) {
                return fn.call(win, e.type || e);
            }
        };
        poll = function() {
            var e;
            try {
                root.doScroll("left");
            } catch (_error) {
                e = _error;
                setTimeout(poll, 50);
                return;
            }
            return init("poll");
        };
        if (doc.readyState !== "complete") {
            if (doc.createEventObject && root.doScroll) {
                try {
                    top = !win.frameElement;
                } catch (_error) {}
                if (top) {
                    poll();
                }
            }
            doc[add](pre + "DOMContentLoaded", init, false);
            doc[add](pre + "readystatechange", init, false);
            return win[add](pre + "load", init, false);
        }
    };

    Dropzone._autoDiscoverFunction = function() {
        if (Dropzone.autoDiscover) {
            return Dropzone.discover();
        }
    };

    contentLoaded(window, Dropzone._autoDiscoverFunction);

}).call(this);
(function(){
    'use strict';

    angular.module('Admin')
        .controller('AdminCtrl', function($scope,
                                          $auth,
                                          ProfileService,
                                          alertService,
                                          uiGmapGoogleMapApi,
                                          $modal,
                                          $log){

            $scope.isAuthenticated = function() {
                return $auth.isAuthenticated();
            };

            $scope.isAdmin = function(){
                return $scope.userProfile.user ? $scope.userProfile.user.isAdmin : false;
            }

            $scope.getUserLocationByIp = function(){
                var promise = ProfileService.getUserLocationByIp();
                promise.then(function(data){
                    //alertService.add("success", "Tenemos localizacion");
                    $scope.loc = data.loc;
                    $scope.httpLocation = data;

                    $scope.map = { center: { latitude: $scope.loc[0], longitude: $scope.loc[1] }, zoom: 8 };
                    $scope.userMap = { center: { latitude: $scope.loc[0], longitude: $scope.loc[1] }, zoom: 8 };
                });
            };

            /**
             * Get user's profile information.
             */
            $scope.getUser = function() {

                var promise = ProfileService.getUser();
                promise.then(
                    function(data){
                        $scope.userProfile = data;
                    },
                    function(error){
                        alertService.add('error', error);
                    });
            };

            $scope.getFriends = function(){
                var promise = ProfileService.getFriends();
                promise.then(function(data){

                    if(typeof data.friends !== 'undefined') $scope.num_friends = data.friends.length;
                    else $scope.num_friends = 0;
                    $scope.friends = data.friends;
                    $scope.not_friends = data.not_friends;
                });
            };

            $scope.getFollowers = function(){
                var promise = ProfileService.getFollowers();
                promise.then(function(data){
                    $scope.followers = data.followers;
                    if(typeof data.followers !== 'undefined') $scope.num_followers = data.followers.length;
                    else $scope.num_followers = 0;
                });
            };

            $scope.getFollowees = function(){
                var promise = ProfileService.getFollowees();
                promise.then(function(data){
                    $scope.followees = data.followees;
                    $scope.users = data.users;
                    if(typeof data.followees !== 'undefined') $scope.num_followees = data.followees.length;
                    else $scope.num_followees = 0;
                });
            };

            $scope.showModal = function(model, id){
                var modal = $modal({scope: $scope, templateUrl: 'partials/components/modal-delete.tpl.html', show: true});
                $scope.title = "Delete " + model;
                $scope.content = "Are you sure that you want to delete this " + model + "?";
                $scope.model = model;
                $scope.id = id;
                modal.$promise.then(modal.show);
            };



            /**
             * SETUP Google Maps
             * @type {{center: {latitude: number, longitude: number}, zoom: number}}
             */


            $scope.location = null;

            uiGmapGoogleMapApi.then(function(maps) {
                $scope.googleVersion = maps.version;
                maps.visualRefresh = true;
                $log.info('$scope.map.rectangle.bounds set');

            });

            $scope.init = function(){
                $log.log("initAdmin");
                $scope.getUserLocationByIp();
                $scope.getUser();
                $scope.getFriends();
                $scope.getFollowers();
                $scope.getFollowees();
            };

            $scope.init();

        });

})();
(function(){
    'use strict';

    angular.module('Admin')
        .controller('DashboardCtrl', function($scope, Account, $state, alertService, ProfileService){

            $scope.alerts = alertService.get();

            $scope.addFriend = function(id){
                var promise = ProfileService.addFriend(id);
                promise.then(function(data){
                    $state.transitionTo($state.current, null, { reload: true, inherit: false, notify: true });
                });
            };

            $scope.removeFriend = function(id){
                var promise = ProfileService.removeFriend(id);
                promise.then(function(data){
                    $state.transitionTo($state.current, null, { reload: true, inherit: false, notify: true });
                });
            };


            $scope.addFollowee = function(id){
                var promise = ProfileService.addFollowee(id);
                promise.then(function(data){
                    $state.transitionTo($state.current, null, { reload: true, inherit: false, notify: true });
                });
            };

            $scope.removeFollowee = function(id){
                var promise = ProfileService.removeFollowee(id);
                promise.then(function(data){
                    $state.transitionTo($state.current, null, { reload: true, inherit: false, notify: true });
                });
            };

        });

})();
/**
 * Created by andres on 9/08/15.
 */
(function () {
    'use strict';

    angular.module('Admin')
        .controller('RoleCtrl', function ($scope, alertService, $state, $stateParams, Role, ngTableParams){

            $scope.alerts = alertService.get();

            /**
             * Get roles list information.
             */
            $scope.getRoles = function() {
                Role.getRoles()
                    .success(function(data) {
                        $scope.roles = data.roles;
                        $scope.permissions = data.permissions;

                        $scope.tableParams = new ngTableParams({
                            page: 1,            // show first page
                            count: 10        // count per page
                        }, {
                            total: $scope.roles.length, // length of data
                            getData: function ($defer, params) {
                                $defer.resolve($scope.roles.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                            }
                        })

                        $scope.tablePermissionParams = new ngTableParams({
                            page: 1,            // show first page
                            count: 10        // count per page
                        }, {
                            total: $scope.permissions.length, // length of data
                            getData: function ($defer, params) {
                                $defer.resolve($scope.permissions.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                            }
                        })

                    })
                    .error(function(error) {
                        alertService.add('error', error.message);
                    });
            };

            /**
             * Get Role data
             */
            $scope.getRole = function(id){
                $scope.roleID = id;
                $scope.editRole = true;
                Role.getRole(id)
                    .success(function(data){
                        $scope.role = data.role;
                        $scope.permissions = data.permissions;
                        $scope.role.permissions = data.role.permissions;

                        $scope.permissionSearchSettings = {enableSearch: true};
                    })
                    .error(function(error) {
                        alertService.add('error', error.message);
                    })
                    .then(function() {
                        alertService.add('success', "User received");
                    });
            }

            /**
             * Create a role.
             */
            $scope.storeRole = function(data) {
                Role.storeRole({
                    name: data.name,
                    display_name: data.display_name,
                    description: data.description
                })
                    .success(function(data){
                        $state.go('roles');
                    })
                    .error(function(error) {
                        alertService.add('error', error.message);
                    })
                    .then(function() {
                        alertService.add('success', "Data has been updated");
                    });
            };

            $scope.updateRole = function(data){
                Role.updateRole({
                    id: data.id,
                    name: data.name,
                    display_name: data.display_name,
                    description: data.description,
                    permissions: data.permissions
                })
                    .success(function(data){
                        $state.go('roles');
                    })
                    .error(function(error) {
                        alertService.add('error', error.message);
                    })
                    .then(function(){
                        alertService.add('success', "Data has been updated");
                    });

            };

            $scope.deleteRole = function(id){

                Role.deleteRole(id)
                    .success(function(data){
                        $state.reload();
                    }).error(function(error) {
                        alertService.add('error', error.message);
                    })
                    .then(function() {
                        alertService.add('success', "Data has been deleted");
                    })
            };

            $scope.submitRole = function(data){

                if(typeof $scope.editRole === 'undefined'){
                    $scope.storeRole(data);
                }else{
                    $scope.updateRole(data);
                }
            };

            /**
             * Get Permission data
             */
            $scope.getPermission = function(id){
                $scope.permID = id;
                $scope.editPerm = true;
                Role.getPermission(id)
                    .success(function(data){
                        $scope.permission = data.permission;
                    })
                    .error(function(error) {
                        alertService.add('error', error.message);
                    })
                    .then(function() {
                        alertService.add('success', "Permission has been received");
                    });
            }

            /**
             * Create a permission.
             */
            $scope.storePermission = function(data) {
                console.log("storePermission");
                Role.storePermission({
                    name: data.name,
                    display_name: data.display_name,
                    description: data.description
                })
                    .success(function(data){
                        $state.go('roles');
                    })
                    .error(function(error) {
                        alertService.add('error', error.message);
                    })
                    .then(function() {
                        alertService.add('success', "Data has been created.");
                    });
            };

            /**
             * Update a permission.
             */
            $scope.updatePermission = function(data) {
                Role.updatePermission({
                    id: data.id,
                    name: data.name,
                    display_name: data.display_name,
                    description: data.description
                })
                    .success(function(data){
                        $state.go('roles');
                    })
                    .error(function(error) {
                        alertService.add('error', error.message);
                    })
                    .then(function() {
                        alertService.add('success', "Data has been created.");
                    });
            };

            /**
             * Delete permission.
             */
            $scope.deletePermission = function(id){

                Role.deletePermission(id)
                    .success(function(data){
                        $state.reload();
                    }).error(function(error) {
                        alertService.add('error', error.message);
                    })
                    .then(function() {
                        alertService.add('success', "Data has been deleted.");
                    })
            };

            /**
             * Send form to appropiate method
             * @param data FormData
             */
            $scope.submitPermission = function(data){
                console.log("submit Permission " + $scope.editPerm);
                if(typeof $scope.editPerm !== 'undefined'){
                    $scope.updatePermission(data);
                }else{
                    $scope.storePermission(data);
                }
            };

            /*$scope.showModal = function(model, id){
             var modal = $modal({scope: $scope, templateUrl: 'partials/components/modal-delete.tpl.html', show: true});
             $scope.title = "Delete " + model;
             $scope.content = "Are you sure that you want to delete this " + model + "?";
             $scope.model = model;
             $scope.id = id;
             modal.$promise.then(modal.show);
             };*/

            $scope.deleteModel = function(model, id){
                if(model == 'role') $scope.deleteRole(id);
                else $scope.deletePermission(id);
            };


            /**
             * Load models depending of the State
             */
            if($stateParams.editRole){
                $scope.getRole($stateParams.roleID);
            }else if($stateParams.editPerm){
                $scope.getPermission($stateParams.permID)
            }else{
                $scope.getRoles();
            }
        })

})();

/**
 * Created by andres on 10/08/15.
 */
(function () {
    'use strict';

    angular.module('Admin')
        .controller('UserCtrl', function ($scope, $state, $stateParams, alertService, $modal, User, $filter, ngTableParams){

            $scope.panes = [
                {title: "Settings", content: "partials/account/profile/settings.html", active:true},
            ];

            $scope.alerts = alertService.get();

            /**
             * Get users list information.
             */
            $scope.getUsers = function() {
                User.getUsers()
                    .success(function(data) {
                        $scope.users = data.users;

                        $scope.tableParams = new ngTableParams({
                            page: 1,
                            count: 10,
                            sorting: {
                                displayName: 'asc'
                            },
                            filter: {
                                displayName: ''
                            }
                        }, {
                            total: $scope.users.length,
                            getData: function ($defer, params) {
                                // use build-in angular filter
                                var orderedData = params.sorting ? $filter('orderBy')(data.users, params.orderBy()) : data.users;
                                orderedData = params.filter ? $filter('filter')(orderedData, params.filter()) : orderedData;
                                $scope.users = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                                params.total(orderedData.length);
                                $defer.resolve($scope.users);
                            }
                        })

                    })
                    .error(function(error) {
                        alertService.add('error', error.message);
                    })
                    .then(function() {
                        alertService.add('success', "Data has been received.");
                    });
            };
            /**
             * Get user data
             */
            $scope.getUser = function(id){
                $scope.userID = id;
                $scope.editUser = true;
                User.getUser(id)
                    .success(function(data){
                        $scope.user = data.user;
                        $scope.image = 'uploads/'+data.user.image;
                        $scope.roles = data.roles;
                        $scope.user.roles = data.user.roles;

                        $scope.roleSearchSettings = {enableSearch: true};
                    })
                    .error(function(error) {
                        alertService.add('error', error.message);
                    })
                    .then(function() {
                        alertService.add('success', "Data has been received.");
                    });
            }

            $scope.updateUser = function(data){
                $scope.image = $('#img').attr('ng-src');
                User.updateUser({
                    id: data.id,
                    displayName: data.displayName,
                    email: data.email,
                    file: $scope.image,
                    roles: data.roles
                })
                    .success(function(data){
                        $state.go('users');
                    })
                    .error(function(error) {
                        alertService.add('error', error.message);
                    })
                    .then(function() {
                        alertService.add('success', "Data has been updated.");
                    })
            }

            $scope.deleteUser = function(id){

                User.deleteUser(id)
                    .success(function(data){
                        console.log(data);
                        $state.reload();
                    }).error(function(error) {
                        alertService.add('error', error.message);
                    })
                    .then(function() {
                        alertService.add('error', "Data has been deleted.");
                    })
            }

            $scope.showModal = function(model, id){
                var modal = $modal({scope: $scope, templateUrl: 'partials/components/modal-delete.tpl.html', show: true});
                $scope.title = "Delete " + model;
                $scope.content = "Are you sure that you want to delete this " + model + "?";
                $scope.model = model;
                $scope.id = id;
                modal.$promise.then(modal.show);
            };

            $scope.delete = function(model, id){
                $scope.deleteUser(id);
            };

            if($stateParams.editUser){
                $scope.getUser($stateParams.userID);
            }else{
                $scope.getUsers();
            }

        })

})();

(function (){
    'use strict';

    angular.module('Admin')
        .directive('ngThumb', ['$window', function($window) {
            var helper = {
                support: !!($window.FileReader && $window.CanvasRenderingContext2D),
                isFile: function(item) {
                    return angular.isObject(item) && item instanceof $window.File;
                },
                isImage: function(file) {
                    var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                    return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                }
            };

            return {
                restrict: 'A',
                template: '<canvas/>',
                link: function(scope, element, attributes) {
                    if (!helper.support) return;

                    var params = scope.$eval(attributes.ngThumb);

                    if (!helper.isFile(params.file)) return;
                    if (!helper.isImage(params.file)) return;

                    var canvas = element.find('canvas');
                    var reader = new FileReader();

                    reader.onload = onLoadFile;
                    reader.readAsDataURL(params.file);

                    function onLoadFile(event) {
                        var img = new Image();
                        img.onload = onLoadImage;
                        img.src = event.target.result;
                    }

                    function onLoadImage() {
                        var width = params.width || this.width / this.height * params.height;
                        var height = params.height || this.height / this.width * params.width;
                        canvas.attr({ width: width, height: height });
                        canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
                    }
                }
            };
        }]);

})();
(function(){
    'use strict';

    angular.module('Admin')
        .directive('googlePlaces', function(){
            var componentForm = {
                premise: 'long_name',
                street_number: 'short_name',
                route: 'long_name',
                sublocality_level_1: 'long_name',
                locality: 'long_name',
                administrative_area_level_1: 'short_name',
                country: 'long_name',
                postal_code: 'short_name'
            };
            var mapping = {
                premise: 'BuildingName',
                street_number: 'Unit',
                route: 'Street',
                sublocality_level_1: 'Suburb',
                locality: 'City',
                administrative_area_level_1: 'State',
                country: 'Country',
                postal_code: 'PostCode'
                //Region, District, Level
            };

            return {
                require: 'ngModel',
                restrict: 'E',
                replace: true,
                // transclude:true,
                scope: {
                    ngModel: '=',
                    address: '=?'
                },
                template: '<input id="google_places_ac" name="google_places_ac" type="text" class="input-block-level" autocomplete="false"/>',
                link: function(scope, element, attrs, model) {

                    var options = {
                        // componentRestrictions: { country: 'nz' },
                        types: ['geocode']
                    };

                    var autocomplete = new google.maps.places.Autocomplete($("#google_places_ac")[0], options);

                    element.bind("keydown keypress", function(event){
                        if(event.which === 13) {
                            scope.$apply(function (){

                                scope.$eval(attrs.ngEnter);
                            });

                            event.preventDefault();
                        }
                    });

                    google.maps.event.addListener(autocomplete, 'place_changed', function() {
                        var place = autocomplete.getPlace();
                        var location = place.geometry && place.geometry.location ? {
                            Latitude: place.geometry.location.lat(),
                            Longitude: place.geometry.location.lng()
                        } : {};

                        // Get each component of the address from the place location
                        // and fill the corresponding field on the form.
                        for (var i = 0; i < place.address_components.length; i++) {
                            var addressType = place.address_components[i].types[0];
                            if (componentForm[addressType]) {
                                var val = place.address_components[i][componentForm[addressType]];
                                location[mapping[addressType]] = val;
                            }
                        }
                        location.FormattedAddress = place.formatted_address;
                        location.PlaceId = place.place_id;

                        scope.$apply(function () {

                            scope.address = location; // array containing each location component
                            model.$setViewValue(location);
                            element.val(location[attrs.value]);
                        });
                    });
                }
            };
        });
})();
(function () {
    'use strict';

    angular
        .module('Admin', [])
        .directive('adminLteLayout', adminLteLayoutDirective)
        .directive('adminLteTree', adminLteTreeDirective)
        .directive('adminLteSidebarToggle', adminLteSidebarToggleDirective)
        .directive('adminLteSidebarToggleSwipe', adminLteSidebarToggleSwipeDirective)
        .directive('adminLteBoxWidget', adminLteBoxWidgetDirective);

    function adminLteLayoutDirective() {
        return {
            restrict: 'A',
            link: link,
            scope: {}
        };

        function link($scope, $element, $attrs) {

            fix();
            fixSidebar();

            $(window, ".wrapper").resize(function () {
                fix();
                fixSidebar();
            });

            function fix() {
                var neg = $('.main-header').outerHeight() + $('.main-footer').outerHeight();
                var window_height = $(window).height();
                var sidebar_height = $('.sidebar').height();
                //Set the min-height of the content and sidebar based on the
                //the height of the document.
                if ($('body').hasClass('fixed')) {
                    $('.content-wrapper, .right-side').css('min-height', window_height - $('.main-footer').outerHeight());
                } else {
                    if (window_height >= sidebar_height) {
                        $('.content-wrapper, .right-side').css('min-height', window_height - neg);
                    } else {
                        $('.content-wrapper, .right-side').css('min-height', sidebar_height);
                    }
                }
            }

            function fixSidebar() {
                if (!$("body").hasClass("fixed")) {
                    if (typeof $.fn.slimScroll != 'undefined') {
                        $(".sidebar").slimScroll({destroy: true}).height("auto");
                    }
                    return;
                } else if (typeof $.fn.slimScroll == 'undefined' && console) {
                    console.error("Error: the fixed layout requires the slimscroll plugin!");
                }
                //Enable slimscroll for fixed layout
                if (typeof $.fn.slimScroll != 'undefined') {
                    //Distroy if it exists
                    $(".sidebar").slimScroll({destroy: true}).height("auto");
                    //Add slimscroll
                    $(".sidebar").slimscroll({
                        height: ($(window).height() - $(".main-header").height()) + "px",
                        color: "rgba(0,0,0,0.2)",
                        size: "3px"
                    });
                }
            }
        }
    }

    function adminLteTreeDirective() {
        return {
            restrict: '',
            link: link,
            scope: {}
        };

        function link($scope, $element, $attrs) {

            $("li a", $($element)).click(function (e) {
                //Get the clicked link and the next element
                var $this = $(this);
                var checkElement = $this.next();

                //Check if the next element is a menu and is visible
                if ((checkElement.is('.treeview-menu')) && (checkElement.is(':visible'))) {
                    //Close the menu
                    checkElement.slideUp('normal', function () {
                        checkElement.removeClass('menu-open');
                        //Fix the layout in case the sidebar stretches over the height of the window
                        //_this.layout.fix();
                    });
                    checkElement.parent("li").removeClass("active");
                }
                //If the menu is not visible
                else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
                    //Get the parent menu
                    var parent = $this.parents('ul').first();
                    //Close all open menus within the parent
                    var ul = parent.find('ul:visible').slideUp('normal');
                    //Remove the menu-open class from the parent
                    ul.removeClass('menu-open');
                    //Get the parent li
                    var parent_li = $this.parent("li");

                    //Open the target menu and add the menu-open class
                    checkElement.slideDown('normal', function () {
                        //Add the class active to the parent li
                        checkElement.addClass('menu-open');
                        parent.find('li.active').removeClass('active');
                        parent_li.addClass('active');
                        //Fix the layout in case the sidebar stretches over the height of the window
                        var neg = $('.main-header').outerHeight() + $('.main-footer').outerHeight();
                        var window_height = $(window).height();
                        var sidebar_height = $('.sidebar').height();
                        //Set the min-height of the content and sidebar based on the
                        //the height of the document.
                        if ($('body').hasClass('fixed')) {
                            $('.content-wrapper, .right-side').css('min-height', window_height - $('.main-footer').outerHeight());
                        } else {
                            if (window_height >= sidebar_height) {
                                $('.content-wrapper, .right-side').css('min-height', window_height - neg);
                            } else {
                                $('.content-wrapper, .right-side').css('min-height', sidebar_height);
                            }
                        }
                    });
                }
                //if this isn't a link, prevent the page from being redirected
                if (checkElement.is('.treeview-menu')) {
                    e.preventDefault();
                }
            });
        }
    }

    function adminLteSidebarToggleDirective() {
        return {
            restrict: 'A',
            link: link,
            scope: {}
        };

        function link($scope, $element, $attrs) {
            //Get the screen sizes
            var screenSizes = {
                xs: 480,
                sm: 768,
                md: 992,
                lg: 1200
            };

            //Enable sidebar toggle
            $($element).click(function (e) {
                e.preventDefault();

                //Enable sidebar push menu
                if ($(window).width() > (screenSizes.sm - 1)) {
                    $("body").toggleClass('sidebar-collapse');
                }
                //Handle sidebar push menu for small screens
                else {
                    if ($("body").hasClass('sidebar-open')) {
                        $("body").removeClass('sidebar-open');
                        $("body").removeClass('sidebar-collapse')
                    } else {
                        $("body").addClass('sidebar-open');
                    }
                }
            });
            //
            $(".content-wrapper").click(function () {
                //Enable hide menu when clicking on the content-wrapper on small screens
                if ($(window).width() <= (screenSizes.sm - 1) && $("body").hasClass("sidebar-open")) {
                    $("body").removeClass('sidebar-open');
                }
            });
        }
    }

    function adminLteSidebarToggleSwipeDirective() {
        return {
            restrict: 'A',
            link: link,
            scope: {}
        };

        function link($scope, $element, $attrs) {
            var _this = {};
            _this.contentSwipeArea = $('.content-swipe-area');
            _this.body = $("body");
            _this.sidebar = $($element);
            _this.navbrand = $('.navbar-brand');
            _this.sidebartoggle = $('.sidebar-toggle');
            setTimeout(setHeight, 0);
            $(window).on('resize', setHeight);
            _this.contentSwipeArea.on("swiperight", openSidebar);
            _this.contentSwipeArea.on("swipeleft", closeSidebar);
            _this.sidebar.on("swipeleft", closeSidebar);
            _this.navbrand.on('click', toggleSidebar);
            _this.navbrand.on("swiperight", openSidebar);
            _this.navbrand.on("swipeleft", closeSidebar);
            _this.sidebartoggle.on("swiperight", openSidebar);
            _this.sidebartoggle.on("swipeleft", closeSidebar);
            function setHeight() {
                _this.contentSwipeArea.css('height', _this.contentSwipeArea.parent().height());
            }

            function openSidebar() {
                _this.body.stop().removeClass("sidebar-collapse");
            }

            function closeSidebar() {
                _this.body.stop().addClass("sidebar-collapse");
            }

            function toggleSidebar() {
                _this.body.toggleClass("sidebar-collapse");
            }
        }
    }

    function adminLteBoxWidgetDirective() {
        return {
            restrict: 'A',
            link: link,
            scope: {}
        };

        function link($scope, $element, $attrs) {

            $($element).find('[data-widget="collapse"]').click(function (e) {
                e.preventDefault();
                collapse();
            });

            $($element).find('[data-widget="remove"]').click(function (e) {
                e.preventDefault();
                remove();
            });

            function collapse() {
                //Find the box parent
                var box = $($element);
                //Find the body and the footer
                var bf = box.find(".box-body, .box-footer");
                if (!box.hasClass("collapsed-box")) {
                    //Convert minus into plus
                    $($element).find('[data-widget="collapse"]').children(".fa-minus").removeClass("fa-minus").addClass("fa-plus");
                    bf.slideUp(300, function () {
                        box.addClass("collapsed-box");
                    });
                } else {
                    //Convert plus into minus
                    $($element).find('[data-widget="collapse"]').children(".fa-plus").removeClass("fa-plus").addClass("fa-minus");
                    bf.slideDown(300, function () {
                        box.removeClass("collapsed-box");
                    });
                }
            }

            function remove() {
                //Find the box parent
                $($element).slideUp();
            }
        }
    }

})();
/**
 * Created by andres on 6/08/15.
 */

(function () {
    'use strict';

    angular.module('Admin')
        .factory('Account', function($http) {
            return {
                getIpInfo: function(){
                    return $http.get('http://ipinfo.io/json');
                },
                getUser: function() {
                    var url = "/api/me";
                    return $http.get(url);
                },
                updateUser: function(profileData) {
                    return $http.put('/api/me', profileData);
                },
                uploadImage: function(profileDate){
                    return $http.post('/api/me/image', profileDate);
                },
                storeProfile: function(profileDate){
                    return $http.post('/api/me/store-profile', profileDate);
                },
                updateProfile: function(profileDate){
                    return $http.post('/api/me/update-profile', profileDate);
                },
                password: function(data){
                    return $http.post('/auth/password/email', data);
                },
                reset: function(data){
                    return $http.post('/auth/password/reset', data);
                },
                getFriends: function(){
                    return $http.get('/api/me/friends');
                },
                addFriend: function(id){
                    return $http.post('/api/me/add-friend', {'id':id});
                },
                removeFriend: function(id){
                    return $http.post('/api/me/remove-friend', {'id':id});
                },
                getFollowers: function(){
                    return $http.get('/api/me/followers');
                },
                addFollower: function(id){
                    return $http.post('/api/me/add-follower', {'id':id});
                },
                removeFollower: function(id){
                    return $http.post('/api/me/remove-follower', {'id':id});
                },
                getFollowees: function(){
                    return $http.get('/api/me/following');
                },
                addFollowee: function(id){
                    return $http.post('/api/me/add-followee', {'id':id});
                },
                removeFollowee: function(id){
                    return $http.post('/api/me/remove-followee', {'id':id});
                },
                storeLocation: function(data){
                    return $http.post('/api/me/store-location', data);
                },
                updateLocation: function(data){
                    return $http.post('/api/me/update-location', data);
                }
            };
        });

})();

(function(){
    'use strict';

    angular.module('Admin')
        .service('ProfileService', function(Account, $q, $log, alertService){

            return {
                getUserLocationByIp: function(){
                    var deferred = $q.defer();
                    Account.getIpInfo()
                        .then(function(response){
                            var ip = response.data.ip;
                            var hostname = response.data.hostname;
                            var location = response.data.loc;
                            var loc = location.split(",");
                            var city = response.data.city;
                            var country = response.data.country;
                            $log.log(loc);
                            deferred.resolve({
                                ip: ip,
                                hostname: hostname,
                                loc: loc,
                                city: city,
                                country: country
                            });
                        }, function(response){
                            deferred.reject(response.status);
                            alertService.add('error', "Request fail. Error from Server code: " + response.status);
                        });
                    return deferred.promise;
                }/*,
                getUser: function(){
                    var deferred = $q.defer();
                    Account.getUser()
                        .then(
                        function(response){
                            var data = response.data;

                            deferred.resolve({
                                user: data.user,
                                image: 'uploads/'+data.user.image,
                                roles: data.roles,
                                user_roles: data.user.roles,
                                about: data.user.profile
                            });
                        }, function(response){
                            deferred.reject(response.status);
                            alertService.add('error', "Request fail. Error server code: " + response.status);
                        });
                    return deferred.promise;
                }*/,
                updateUser: function(data){
                    var deferred = $q.defer();
                    Account.updateUser(data)
                        .then(function(response){
                            alertService.add('success', 'User updated.');

                        }, function(response){
                            deferred.reject(response.status);
                            alertService.add('error', "Request fail. Error server code: " + response.status);
                        });

                    return deferred.promise;

                },
                storeProfile: function(data){
                    var deferred = $q.defer();
                    Account.storeProfile(data)
                        .then(function(response){
                            alertService.add('success', "User's Profile has been update.");

                        }, function(response){
                            deferred.reject(response.status);
                            alertService.add('error', "Request fail. Error server code: " + response.status);
                        });
                    return deferred.promise;
                },
                updateProfile: function(data){
                    var deferred = $q.defer();
                    Account.updateProfile(data)
                        .then(function(response){
                            alertService.add('success', "User's Profile has been update.");

                        }, function(response){
                            deferred.reject(response.status);
                            alertService.add('error', "Request fail. Error server code: " + response.status);
                        });
                    return deferred.promise;
                },
                getFriends: function(){
                    var deferred = $q.defer();
                    Account.getFriends()
                        .then(function(response){
                            var data = response.data;
                            deferred.resolve({
                                not_friends: data.not_friends,
                                friends: data.friends
                            });
                        }, function(response){
                            deferred.reject(response.status);
                            alertService.add('error', "Request fail. Error server code: " + response.status);
                        });
                    return deferred.promise;
                },
                getFollowees: function(){
                    var deferred = $q.defer();
                    Account.getFollowees()
                        .then(function(response){
                            var data = response.data;
                            var users = data.users;
                            var followees = data.followees;
                            angular.forEach(users, function(user){
                                angular.forEach(followees, function(followee){
                                    //console.log("f= " + followee.id + " u= " + user.id);
                                    if(followee.id == user.id) user.isFollowing = true;
                                });
                            });

                            deferred.resolve({
                                users: users,
                                followees: followees
                            });

                        }, function(response){
                            deferred.reject(response.status);
                            alertService.add('error', "Request fail. Error server code: " + response.status);
                        });
                    return deferred.promise;
                },
                getFollowers: function(){
                    var deferred = $q.defer();
                    Account.getFollowers()
                        .then(function(response){
                            var data = response.data;
                            deferred.resolve({
                                followers: data.followers
                            });

                        }, function(response){
                            deferred.reject(response.status);
                            alertService.add('error', "Request fail. Error server code: " + response.status);
                        });
                    return deferred.promise;
                },
                addFriend: function(id){
                    var deferred = $q.defer();
                    Account.addFriend(id)
                        .then(function(response){
                            deferred.resolve({
                                success: response.status
                            });
                            alertService.add('success', "Data has been added.");
                        }, function(response){
                            deferred.reject(response.status);
                            alertService.add('error', "Request fail. Error server code: " + response.status);
                        });
                    return deferred.promise;
                },
                removeFriend: function(id){
                    var deferred = $q.defer();
                    Account.removeFriend(id)
                        .then(function(response){
                            deferred.resolve({
                                success: response.status
                            });
                            alertService.add('success', "Data has been added.");
                        }, function(response){
                            deferred.reject(response.status);
                            alertService.add('error', "Request fail. Error server code: " + response.status);
                        });
                    return deferred.promise;
                },
                addFollowee: function(id){
                    var deferred = $q.defer();
                    Account.addFollowee(id)
                        .then(function(response){
                            deferred.resolve({
                                success: response.status
                            });
                            alertService.add('success', "Data has been added.");
                        }, function(response){
                            deferred.reject(response.status);
                            alertService.add('error', "Request fail. Error server code: " + response.status);
                        });
                    return deferred.promise;
                },
                removeFollowee: function(id){
                    var deferred = $q.defer();
                    Account.removeFollowee(id)
                        .then(function(response){
                            deferred.resolve({
                                success: response.status
                            });
                            alertService.add('success', "Data has been added.");
                        }, function(response){
                            deferred.reject(response.status);
                            alertService.add('error', "Request fail. Error server code: " + response.status);
                        });
                    return deferred.promise;
                },
                storeLocation: function(data){
                    var deferred = $q.defer();
                    Account.storeLocation(data)
                        .then(function(response){
                            deferred.resolve({
                                address: response.data
                            });
                            alertService.add('success', "Data has been added.");
                        }, function(response){
                            deferred.reject(response.status);
                            alertService.add('error', "Request fail. Error server code: " + response.status);
                        });
                    return deferred.promise;
                },
                updateLocation: function(data){
                    var deferred = $q.defer();
                    Account.updateLocation(data)
                        .then(function(response){
                            var data = response.data;
                            deferred.resolve({
                                data: data
                            });
                            alertService.add('success', "Data has been added.");
                        }, function(response){
                            deferred.reject(response.status);
                            alertService.add('error', "Request fail. Error server code: " + response.status);
                        });
                    return deferred.promise;
                }


            };
        });

})();
/**
 * Created by andres on 9/08/15.
 */
(function () {
    'use strict';

    angular.module('Admin')
        .factory('Role', function($http){
            return {
                getRoles: function() {
                    var url = "/api/dashboard/roles";
                    return $http.get(url);
                },
                getRole: function(id){
                    return $http.get('/api/dashboard/role/'+id);
                },
                storeRole: function(data) {
                    return $http.post('/api/dashboard/roles/store-role', data);
                },
                updateRole: function(data){
                    return $http.post('/api/dashboard/roles/update-role', data);
                },
                deleteRole: function(id){
                    return $http.post('/api/dashboard/roles/destroy-role', {id: id});
                },
                getPermission: function(id){
                    return $http.get('/api/dashboard/perm/'+id);
                },
                storePermission: function(data) {
                    return $http.post('/api/dashboard/perm/store-permission', data);
                },
                updatePermission: function(data){
                    return $http.post('/api/dashboard/perm/update-permission', data);
                },
                deletePermission: function(id){
                    return $http.post('/api/dashboard/perm/destroy-permission', {id: id});
                }
            };
        })

})();

/**
 * Created by andres on 10/08/15.
 */
(function (){
    'use strict';

    angular.module('Admin')
        .factory('User', function($http){

            return {
                getUsers: function(){
                    return $http.get('api/dashboard/users');
                },
                getUser: function(id){
                    return $http.get('api/dashboard/user/'+id);
                },
                updateUser: function(data){
                    return $http.post('api/dashboard/user/update-user', data);
                },
                deleteUser: function(id){
                    return $http.post('api/dashboard/user/destroy-user', {id: id});
                }
            };

        })

})();

'use strict';

(function() {
    angular.module('Admin')
        .controller('layoutCtrl', layoutCtrl);


    function layoutCtrl($scope, $rootScope) {
        $scope.title = 'default title';
        $scope.subtitle = 'default subtitle';

        $rootScope.stylesheets = [
            {href: 'css/admin/app.css', type: 'text/css'},
            {href: 'css/admin/admin.css', type: 'text/css'}
        ];
    }

    layoutCtrl.$inject = ['$scope', '$rootScope'];
})();
'use strict';

(function() {

    'use strict';

    angular.module('Admin')
        .controller('SidebarMenuCtrl', function($scope, sidebarMenuService, $auth, alertService, Account){

            $scope.alerts = alertService.get();

            sidebarMenuService.getSidebar()
                .success(function(data, status, headers, config){
                    data = data || {};
                    $scope.menus = data.sidebar || [];
                });
        });

})();
(function(){
    'use strict';

    angular.module('Admin')
        .directive('adminLteBoxWidget', function(){
            return {
                restrict: 'A',
                link: link,
                scope: {}
            };

            function link($scope, $element, $attrs) {

                $($element).find('[data-widget="collapse"]').click(function (e) {
                    e.preventDefault();
                    collapse();
                });

                $($element).find('[data-widget="remove"]').click(function (e) {
                    e.preventDefault();
                    remove();
                });

                function collapse() {
                    //Find the box parent
                    var box = $($element);
                    //Find the body and the footer
                    var bf = box.find(".box-body, .box-footer");
                    if (!box.hasClass("collapsed-box")) {
                        //Convert minus into plus
                        $($element).find('[data-widget="collapse"]').children(".fa-minus").removeClass("fa-minus").addClass("fa-plus");
                        bf.slideUp(300, function () {
                            box.addClass("collapsed-box");
                        });
                    } else {
                        //Convert plus into minus
                        $($element).find('[data-widget="collapse"]').children(".fa-plus").removeClass("fa-plus").addClass("fa-minus");
                        bf.slideDown(300, function () {
                            box.removeClass("collapsed-box");
                        });
                    }
                }

                function remove() {
                    //Find the box parent
                    $($element).slideUp();
                }
            }
        });

})();
(function(){
    'use strict';

    angular.module('Admin')
        .directive('adminLteControlSidebar', function(){
            console.log("adminLteControlSidebar");
            return {
                restrict: 'A',
                link: link,
                scope: {}
            };

            function link($scope, $element, $attrs) {
                var _this = {};
                _this.body = $("body");
                _this.sidebar = $($element);
                _this.navbrand = $('.navbar-brand');
                _this.sidebartoggle = $('.control-sidebar-toggle');


                _this.navbrand.on('click', toggleSidebar);
                _this.sidebartoggle.on("click", toggleSidebar);


                function toggleSidebar() {
                    //If the sidebar is not open
                    if (!_this.sidebar.hasClass('control-sidebar-open') && !$('body').hasClass('control-sidebar-open')) {
                        //Open the sidebar
                        open(_this.sidebar, true);
                    } else {
                        close(_this.sidebar, true);
                    }
                }

                //If the body has a boxed layout, fix the sidebar bg position
                _this.bg = $(".control-sidebar-bg");
                fix(_this.bg);

                //If the body has a fixed layout, make the control sidebar fixed
                if ($('body').hasClass('fixed')) {
                    fixForFixed(_this.sidebar);
                } else {
                    //If the content height is less than the sidebar's height, force max height
                    if ($('.content-wrapper, .right-side').height() < _this.sidebar.height()) {
                        fixForContent(_this.sidebar);
                    }
                }

                function open (sidebar, slide) {
                    //Slide over content
                    if (slide) {
                        sidebar.addClass('control-sidebar-open');
                    } else {
                        //Push the content by adding the open class to the body instead
                        //of the sidebar itself
                        $('body').addClass('control-sidebar-open');
                    }

                }

                function close  (sidebar, slide) {
                    if (slide) {
                        sidebar.removeClass('control-sidebar-open');
                    } else {
                        $('body').removeClass('control-sidebar-open');
                    }
                }

                function fix (sidebar) {
                    var _this = this;
                    if ($("body").hasClass('layout-boxed')) {
                        sidebar.css('position', 'absolute');
                        sidebar.height($(".wrapper").height());
                        $(window).resize(function () {
                            fix(sidebar);
                        });
                    } else {
                        sidebar.css({
                            'position': 'fixed',
                            'height': 'auto'
                        });
                    }

                }

                function fixForFixed(sidebar) {
                    sidebar.css({
                        'position': 'fixed',
                        'max-height': '100%',
                        'overflow': 'auto',
                        'padding-bottom': '50px'
                    });
                }

                function fixForContent(sidebar){
                    $(".content-wrapper, .right-side").css('min-height', sidebar.height());
                }
            }

        });

})();
(function(){
    'use strict';

    angular.module('Admin')
        .directive('adminLteLayout', function(){
            console.log("adminLteLayout");
            return {
                restrict: 'A',
                link: link,
                scope: {}
            };

            function link($scope, $element, $attrs) {

                fix();
                fixSidebar();

                $(window, ".wrapper").resize(function () {
                    fix();
                    fixSidebar();
                });

                function fix() {
                    var neg = $('.main-header').outerHeight() + $('.main-footer').outerHeight();
                    var window_height = $(window).height();
                    var sidebar_height = $('.sidebar').height();
                    //Set the min-height of the content and sidebar based on the
                    //the height of the document.
                    if ($('body').hasClass('fixed')) {
                        $('.content-wrapper, .right-side').css('min-height', window_height - $('.main-footer').outerHeight());
                    } else {
                        if (window_height >= sidebar_height) {
                            $('.content-wrapper, .right-side').css('min-height', window_height - neg);
                        } else {
                            $('.content-wrapper, .right-side').css('min-height', sidebar_height);
                        }
                    }
                }

                function fixSidebar() {
                    if (!$("body").hasClass("fixed")) {
                        if (typeof $.fn.slimScroll != 'undefined') {
                            $(".sidebar").slimScroll({destroy: true}).height("auto");
                        }
                        return;
                    } else if (typeof $.fn.slimScroll == 'undefined' && console) {
                        console.error("Error: the fixed layout requires the slimscroll plugin!");
                    }
                    //Enable slimscroll for fixed layout
                    if (typeof $.fn.slimScroll != 'undefined') {
                        //Distroy if it exists
                        $(".sidebar").slimScroll({destroy: true}).height("auto");
                        //Add slimscroll
                        $(".sidebar").slimscroll({
                            height: ($(window).height() - $(".main-header").height()) + "px",
                            color: "rgba(0,0,0,0.2)",
                            size: "3px"
                        });
                    }
                }
            }
        });
})();
(function(){
    'use strict';

    angular.module('Admin')
        .directive('adminLteSidebarToggleSwipe', function(){

            return {
                restrict: 'A',
                link: link,
                scope: {}
            };

            function link($scope, $element, $attrs) {
                var _this = {};
                _this.contentSwipeArea = $('.content-swipe-area');

                _this.body = $("body");
                _this.sidebar = $($element);
                _this.navbrand = $('.navbar-brand');
                _this.sidebartoggle = $('.sidebar-toggle');
                setTimeout(setHeight, 0);
                $(window).on('resize', setHeight);
                _this.contentSwipeArea.on("swiperight", openSidebar);
                _this.contentSwipeArea.on("swipeleft", closeSidebar);
                _this.sidebar.on("swipeleft", closeSidebar);
                _this.navbrand.on('click', toggleSidebar);
                _this.navbrand.on("swiperight", openSidebar);
                _this.navbrand.on("swipeleft", closeSidebar);
                _this.sidebartoggle.on("swiperight", openSidebar);
                _this.sidebartoggle.on("swipeleft", closeSidebar);
                function setHeight() {
                    _this.contentSwipeArea.css('height', _this.contentSwipeArea.parent().height());
                }

                function openSidebar() {

                    _this.body.stop().removeClass("sidebar-collapse");
                }

                function closeSidebar() {
                    _this.body.stop().addClass("sidebar-collapse");
                }

                function toggleSidebar() {
                    _this.body.toggleClass("sidebar-collapse");
                }
            }
        });

})();
(function(){
    'use strict';

    angular.module('Admin')
        .directive('adminLteSidebarToggle', function(){

            return {
                restrict: 'A',
                link: link,
                scope: {}
            };

            function link($scope, $element, $attrs) {
                //Get the screen sizes
                var screenSizes = {
                    xs: 480,
                    sm: 768,
                    md: 992,
                    lg: 1200
                };

                //Enable sidebar toggle
                $($element).click(function (e) {
                    e.preventDefault();

                    //Enable sidebar push menu
                    if ($(window).width() > (screenSizes.sm - 1)) {
                        $("body").toggleClass('sidebar-collapse');
                    }
                    //Handle sidebar push menu for small screens
                    else {
                        if ($("body").hasClass('sidebar-open')) {
                            $("body").removeClass('sidebar-open');
                            $("body").removeClass('sidebar-collapse')
                        } else {
                            $("body").addClass('sidebar-open');
                        }
                    }
                });
                //
                $(".content-wrapper").click(function () {
                    //Enable hide menu when clicking on the content-wrapper on small screens
                    if ($(window).width() <= (screenSizes.sm - 1) && $("body").hasClass("sidebar-open")) {
                        $("body").removeClass('sidebar-open');
                    }
                });
            }
        });
})();
(function(){

    'use strict';

    angular.module('Admin')

        .directive('adminLteTree', [function() {
            console.log("adminLteTree");
            return {
                restrict: '',
                link: link,
                scope: {}
            };

            function link($scope, $element, $attrs) {

                $("li a", $($element)).click(function (e) {
                    //Get the clicked link and the next element
                    var $this = $(this);
                    var checkElement = $this.next();

                    //Check if the next element is a menu and is visible
                    if ((checkElement.is('.treeview-menu')) && (checkElement.is(':visible'))) {
                        //Close the menu
                        checkElement.slideUp('normal', function () {
                            checkElement.removeClass('menu-open');
                            //Fix the layout in case the sidebar stretches over the height of the window
                            //_this.layout.fix();
                        });
                        checkElement.parent("li").removeClass("active");
                    }
                    //If the menu is not visible
                    else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
                        //Get the parent menu
                        var parent = $this.parents('ul').first();
                        //Close all open menus within the parent
                        var ul = parent.find('ul:visible').slideUp('normal');
                        //Remove the menu-open class from the parent
                        ul.removeClass('menu-open');
                        //Get the parent li
                        var parent_li = $this.parent("li");

                        //Open the target menu and add the menu-open class
                        checkElement.slideDown('normal', function () {
                            //Add the class active to the parent li
                            checkElement.addClass('menu-open');
                            parent.find('li.active').removeClass('active');
                            parent_li.addClass('active');
                            //Fix the layout in case the sidebar stretches over the height of the window
                            var neg = $('.main-header').outerHeight() + $('.main-footer').outerHeight();
                            var window_height = $(window).height();
                            var sidebar_height = $('.sidebar').height();
                            //Set the min-height of the content and sidebar based on the
                            //the height of the document.
                            if ($('body').hasClass('fixed')) {
                                $('.content-wrapper, .right-side').css('min-height', window_height - $('.main-footer').outerHeight());
                            } else {
                                if (window_height >= sidebar_height) {
                                    $('.content-wrapper, .right-side').css('min-height', window_height - neg);
                                } else {
                                    $('.content-wrapper, .right-side').css('min-height', sidebar_height);
                                }
                            }
                        });
                    }
                    //if this isn't a link, prevent the page from being redirected
                    if (checkElement.is('.treeview-menu')) {
                        e.preventDefault();
                    }
                });
            }
        }]);

})();

'use strict';

(function() {

    function sidebarMenuService($http) {
        function getSidebar() {
            return $http.get('assets/data/sidebar.json');
        }


        return {
            getSidebar: getSidebar
        };


    }

    sidebarMenuService.$inject = ['$http'];


    angular.module('Admin')

        .service('sidebarMenuService', sidebarMenuService);


})();