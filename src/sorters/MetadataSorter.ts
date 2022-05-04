export default interface MetadataSorter<Metadata> {
	sortMetadata(metadata: Metadata): Metadata;
}
