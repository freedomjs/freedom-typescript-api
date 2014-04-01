/// <reference path='promise.d.ts' />

declare module freedom {
  // Corresponds to Freedom object of type `proxy`.
  interface ProxyEventInterface {
    on(eventType:string, handler:Function) : void;
    emit(eventType:string, handler:Function) : void;
  }
  // Specification for a channel.
  interface ChannelSpecifier {
    channel     :ProxyEventInterface;  // How to communicate over this channel.
    identifier  :string;  // identifier for the created channel
  }
  interface Core {
    // Create a new channel which which to communicate between modules.
    createChannel() : Promise<ChannelSpecifier>;
    // Given a string-identifier for a channel, create a proxy event interface
    // for it.
    bindChannel(identifier:string) : Promise<ProxyEventInterface>;
    // Returns the list of identifiers describing the dependency path.
    getId() : string[];
  }
  function core() : Core

  // This is the first argument given to a core provider's constructor. It is an
  // object that describes the parent module the core provider instance has been
  // created for.
  interface CoreProviderParentApp {
    manifestId :string;
    config :{
      views :{ [viewName:string] : Object };
    };
    global :{
      removeEventListener :(string, Function, boolean) => void;
    };
  }

  // Communicate with the parent module. If this is the outer-page, then
  // communicates with the root module.
  function on(eventType:string, f :Function) : void
  function emit(eventType:string, value :Object) : void
}

interface Window {
  // The freedom config call registers
  freedomcfg(register:(providerName:string, classFn:Function) => void) : void;
}
