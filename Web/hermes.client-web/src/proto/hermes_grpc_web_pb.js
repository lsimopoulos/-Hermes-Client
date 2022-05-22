/**
 * @fileoverview gRPC-Web generated client stub for chat
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.chat = require('./hermes_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.chat.ChatterClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.chat.ChatterPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.chat.sendRequest,
 *   !proto.chat.chatReply>}
 */
const methodDescriptor_Chatter_chat = new grpc.web.MethodDescriptor(
  '/chat.Chatter/chat',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.chat.sendRequest,
  proto.chat.chatReply,
  /**
   * @param {!proto.chat.sendRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.chat.chatReply.deserializeBinary
);


/**
 * @param {!proto.chat.sendRequest} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.chat.chatReply>}
 *     The XHR Node Readable Stream
 */
proto.chat.ChatterClient.prototype.chat =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/chat.Chatter/chat',
      request,
      metadata || {},
      methodDescriptor_Chatter_chat);
};


/**
 * @param {!proto.chat.sendRequest} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.chat.chatReply>}
 *     The XHR Node Readable Stream
 */
proto.chat.ChatterPromiseClient.prototype.chat =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/chat.Chatter/chat',
      request,
      metadata || {},
      methodDescriptor_Chatter_chat);
};


module.exports = proto.chat;

