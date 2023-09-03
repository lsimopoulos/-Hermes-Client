/**
 * @fileoverview gRPC-Web generated client stub for chat
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.4.2
// 	protoc              v3.20.0
// source: hermes.proto


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js')
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
  this.hostname_ = hostname.replace(/\/+$/, '');

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
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.chat.sendRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_Chatter_chat = new grpc.web.MethodDescriptor(
  '/chat.Chatter/chat',
  grpc.web.MethodType.UNARY,
  proto.chat.sendRequest,
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.chat.sendRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.chat.sendRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.chat.ChatterClient.prototype.chat =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/chat.Chatter/chat',
      request,
      metadata || {},
      methodDescriptor_Chatter_chat,
      callback);
};


/**
 * @param {!proto.chat.sendRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     Promise that resolves to the response
 */
proto.chat.ChatterPromiseClient.prototype.chat =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/chat.Chatter/chat',
      request,
      metadata || {},
      methodDescriptor_Chatter_chat);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.chat.chatStatus,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_Chatter_sendIsTyping = new grpc.web.MethodDescriptor(
  '/chat.Chatter/sendIsTyping',
  grpc.web.MethodType.UNARY,
  proto.chat.chatStatus,
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.chat.chatStatus} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.chat.chatStatus} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.chat.ChatterClient.prototype.sendIsTyping =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/chat.Chatter/sendIsTyping',
      request,
      metadata || {},
      methodDescriptor_Chatter_sendIsTyping,
      callback);
};


/**
 * @param {!proto.chat.chatStatus} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     Promise that resolves to the response
 */
proto.chat.ChatterPromiseClient.prototype.sendIsTyping =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/chat.Chatter/sendIsTyping',
      request,
      metadata || {},
      methodDescriptor_Chatter_sendIsTyping);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.google.protobuf.Empty,
 *   !proto.chat.chatReply>}
 */
const methodDescriptor_Chatter_connectMessages = new grpc.web.MethodDescriptor(
  '/chat.Chatter/connectMessages',
  grpc.web.MethodType.SERVER_STREAMING,
  google_protobuf_empty_pb.Empty,
  proto.chat.chatReply,
  /**
   * @param {!proto.google.protobuf.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.chat.chatReply.deserializeBinary
);


/**
 * @param {!proto.google.protobuf.Empty} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.chat.chatReply>}
 *     The XHR Node Readable Stream
 */
proto.chat.ChatterClient.prototype.connectMessages =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/chat.Chatter/connectMessages',
      request,
      metadata || {},
      methodDescriptor_Chatter_connectMessages);
};


/**
 * @param {!proto.google.protobuf.Empty} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.chat.chatReply>}
 *     The XHR Node Readable Stream
 */
proto.chat.ChatterPromiseClient.prototype.connectMessages =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/chat.Chatter/connectMessages',
      request,
      metadata || {},
      methodDescriptor_Chatter_connectMessages);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.google.protobuf.Empty,
 *   !proto.chat.chatStatus>}
 */
const methodDescriptor_Chatter_connectStatus = new grpc.web.MethodDescriptor(
  '/chat.Chatter/connectStatus',
  grpc.web.MethodType.SERVER_STREAMING,
  google_protobuf_empty_pb.Empty,
  proto.chat.chatStatus,
  /**
   * @param {!proto.google.protobuf.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.chat.chatStatus.deserializeBinary
);


/**
 * @param {!proto.google.protobuf.Empty} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.chat.chatStatus>}
 *     The XHR Node Readable Stream
 */
proto.chat.ChatterClient.prototype.connectStatus =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/chat.Chatter/connectStatus',
      request,
      metadata || {},
      methodDescriptor_Chatter_connectStatus);
};


/**
 * @param {!proto.google.protobuf.Empty} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.chat.chatStatus>}
 *     The XHR Node Readable Stream
 */
proto.chat.ChatterPromiseClient.prototype.connectStatus =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/chat.Chatter/connectStatus',
      request,
      metadata || {},
      methodDescriptor_Chatter_connectStatus);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.google.protobuf.Empty,
 *   !proto.chat.getContactsReply>}
 */
const methodDescriptor_Chatter_getContacts = new grpc.web.MethodDescriptor(
  '/chat.Chatter/getContacts',
  grpc.web.MethodType.UNARY,
  google_protobuf_empty_pb.Empty,
  proto.chat.getContactsReply,
  /**
   * @param {!proto.google.protobuf.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.chat.getContactsReply.deserializeBinary
);


/**
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.chat.getContactsReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.chat.getContactsReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.chat.ChatterClient.prototype.getContacts =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/chat.Chatter/getContacts',
      request,
      metadata || {},
      methodDescriptor_Chatter_getContacts,
      callback);
};


/**
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.chat.getContactsReply>}
 *     Promise that resolves to the response
 */
proto.chat.ChatterPromiseClient.prototype.getContacts =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/chat.Chatter/getContacts',
      request,
      metadata || {},
      methodDescriptor_Chatter_getContacts);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.chat.addContactRequest,
 *   !proto.chat.contact>}
 */
const methodDescriptor_Chatter_addContact = new grpc.web.MethodDescriptor(
  '/chat.Chatter/addContact',
  grpc.web.MethodType.UNARY,
  proto.chat.addContactRequest,
  proto.chat.contact,
  /**
   * @param {!proto.chat.addContactRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.chat.contact.deserializeBinary
);


/**
 * @param {!proto.chat.addContactRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.chat.contact)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.chat.contact>|undefined}
 *     The XHR Node Readable Stream
 */
proto.chat.ChatterClient.prototype.addContact =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/chat.Chatter/addContact',
      request,
      metadata || {},
      methodDescriptor_Chatter_addContact,
      callback);
};


/**
 * @param {!proto.chat.addContactRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.chat.contact>}
 *     Promise that resolves to the response
 */
proto.chat.ChatterPromiseClient.prototype.addContact =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/chat.Chatter/addContact',
      request,
      metadata || {},
      methodDescriptor_Chatter_addContact);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.chat.addGroupRequest,
 *   !proto.chat.contact>}
 */
const methodDescriptor_Chatter_addGroup = new grpc.web.MethodDescriptor(
  '/chat.Chatter/addGroup',
  grpc.web.MethodType.UNARY,
  proto.chat.addGroupRequest,
  proto.chat.contact,
  /**
   * @param {!proto.chat.addGroupRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.chat.contact.deserializeBinary
);


/**
 * @param {!proto.chat.addGroupRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.chat.contact)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.chat.contact>|undefined}
 *     The XHR Node Readable Stream
 */
proto.chat.ChatterClient.prototype.addGroup =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/chat.Chatter/addGroup',
      request,
      metadata || {},
      methodDescriptor_Chatter_addGroup,
      callback);
};


/**
 * @param {!proto.chat.addGroupRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.chat.contact>}
 *     Promise that resolves to the response
 */
proto.chat.ChatterPromiseClient.prototype.addGroup =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/chat.Chatter/addGroup',
      request,
      metadata || {},
      methodDescriptor_Chatter_addGroup);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.chat.historyMessagesRequest,
 *   !proto.chat.historyMessagesResponse>}
 */
const methodDescriptor_Chatter_historyMessages = new grpc.web.MethodDescriptor(
  '/chat.Chatter/historyMessages',
  grpc.web.MethodType.UNARY,
  proto.chat.historyMessagesRequest,
  proto.chat.historyMessagesResponse,
  /**
   * @param {!proto.chat.historyMessagesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.chat.historyMessagesResponse.deserializeBinary
);


/**
 * @param {!proto.chat.historyMessagesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.chat.historyMessagesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.chat.historyMessagesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.chat.ChatterClient.prototype.historyMessages =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/chat.Chatter/historyMessages',
      request,
      metadata || {},
      methodDescriptor_Chatter_historyMessages,
      callback);
};


/**
 * @param {!proto.chat.historyMessagesRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.chat.historyMessagesResponse>}
 *     Promise that resolves to the response
 */
proto.chat.ChatterPromiseClient.prototype.historyMessages =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/chat.Chatter/historyMessages',
      request,
      metadata || {},
      methodDescriptor_Chatter_historyMessages);
};


module.exports = proto.chat;

