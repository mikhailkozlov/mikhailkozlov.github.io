---
title: Where IN Query Using Codeigniter MongoDB Library
tags:
    - Codeigniter
    - MongoDB
    - tips
categories:
    - development

excerpt: Thank you Alex and all others who contributed. Library lets you easily create complex where clause without touching MongoDB syntax. Unfortunately IN (and I imagine NIN and some other statements) are not translated correctly.
---

Thanks to Alex Bilbie we all have simple way of integrating new MongoDB data store into Codeigniter applications. Thank you Alex and all others who contributed. Library lets you easily create complex where clause without touching MongoDB syntax. Unfortunately IN (and I imagine NIN and some other statements) are not translated correctly. Specificaly proble surfaces when you try to query documents by _id. It looks like there is an open issue on [bitbucket.org](https://bitbucket.org/alexbilbie/codeigniter-mongo-library/issue/18/one-where-when-using-_id), but page never loads for me. If it works for you and it has fix, you can stop reading.

### July 24, 2011: Update

My commit was pulled into main repo. Please be sure to [check it out from Alex's repo](https://github.com/alexbilbie/codeigniter-mongodb-library).

## Solution

I do not have bitbucket account, so I forked library on [gitgub.com](https://github.com/alexbilbie/codeigniter-mongodb-library) and created a [fix](https://github.com/315design/codeigniter-mongodb-library/commit/053fe83fc870b287850f9ba49af89dc3cc595411):

	if( is_array( $this->wheres['_id'][key($this->wheres['_id'])]) ){
		foreach($this->wheres['_id'][key($this->wheres['_id'])] as $i=>$id)
		{
			if( !($id instanceof MongoId) )
			{
				$this->wheres['_id'][key($this->wheres['_id'])][$i] = new MongoId($id);
			}else{
				$this->wheres['_id'] = new MongoId($this->wheres['_id']);
			}
		}
	}
	
Code may be not the most robust, but it does the job for me. You can simply replace line 601 `($this->wheres['_id'] = new MongoId($this->wheres['_id']);)` with the code above or clone my repo on [github.com](https://github.com/). Let me know what you think down bellow or open an [issue](https://github.com/315design/codeigniter-mongodb-library/issues).
