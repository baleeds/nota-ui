import { DocumentNode } from 'graphql';
import { DataProxy } from 'apollo-cache';

export interface ApolloFragmentArgs {
  proxy: DataProxy;
  fragment: DocumentNode;
  fragmentName: string;
  id: string;
}

export class ApolloFragment<TFragment> {
  fragment: DocumentNode;
  fragmentName: string;
  id: string;
  proxy: DataProxy;

  constructor(args: ApolloFragmentArgs) {
    this.proxy = args.proxy;
    this.fragment = args.fragment;
    this.fragmentName = args.fragmentName;
    this.id = args.id;
  }

  read = () => {
    return this.proxy.readFragment<TFragment>({
      fragment: this.fragment,
      fragmentName: this.fragmentName,
      id: this.id,
    });
  };

  write = (data: TFragment) => {
    this.proxy.writeFragment({
      fragment: this.fragment,
      fragmentName: this.fragmentName,
      id: this.id,
      data,
    });
  };
}
