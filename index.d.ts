declare const md5Dir: {
	/**
	Asynchronously get the MD5-sum of the directory at `dirname`
	@returns A `Promise` that will be resolved with a string containing the MD5-sum.
	*/
	(dirname: string): Promise<string>

	/**
	Synchronously get the MD5-sum of the directory at `dirname`
	@returns A string containing the MD5-sum.
	*/
	sync(dirname: string): string
}

export = md5Dir
