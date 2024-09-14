import { errorHandler } from "../error/errorcontrol.js"
import Listing from "../models/listingmodel.js"

export const createlistings=async(req,res,next)=>{
    try {
        const listing=await Listing.create(req.body)
        return res.status(201).json(listing)
    } catch (error) {
        next(error)
    }
}

export const deletelistings=async(req,res,next)=>{
   
        const listing= await Listing.findById(req.params.id)
        if(!listing){
            return next(errorHandler(404,'No listing are there'))
        }
        if(req.user.id!==listing.userRef){
            return next(errorHandler(404,"cannot delete others listing"))
        }
        try {
            await Listing.findByIdAndDelete(req.params.id)
            res.status(200).json('Listing has been deleted')
    } catch (error) {
        next(error)
    }
}
export const updatelisting=async(req,res,next)=>{

    const listing= await Listing.findById(req.params.id)
    if(!listing){
        return next(errorHandler(404,'No listing found'))
    }
    if(req.user.id!==listing.userRef){
        return next(errorHandler(404,"cannot update others listing"))
    }
    try {
        const updatedlisting=await Listing.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(200).json(updatedlisting)
} catch (error) {
    next(error)
}

}
export const getlisting=async(req,res,next)=>{
    try {
        const listings=await Listing.findById(req.params.id)
        if(!listings){
            return next(errorHandler(404,'Listing not found'))
        }
        res.status(200).json(listings)
    } catch (error) {
        next(error)
    }
}


//important function of search functionality..
export const getlistings = async (req, res, next) => { //search functionality bale ka hai
    try {
      const limit = parseInt(req.query.limit) || 9;
      const startIndex = parseInt(req.query.startIndex) || 0;  //extracting data from URL which is define at fetxhing like req.body
      let offer = req.query.offer; //offer is a variable that gets its value from the query parameters in an HTTP request, i.e., req.query.offer.
  
      if (offer === undefined || offer === 'false') {
        offer = { $in: [false, true] }; //If offer is undefined or 'false', it is set to { $in: [false, true] }. This means the query will not filter based on the offer field, effectively including all documents regardless of their offer value.
      }
  
      let furnished = req.query.furnished;
  
      if (furnished === undefined || furnished === 'false') {
        furnished = { $in: [false, true] };
      }
  
      let parking = req.query.parking;
  
      if (parking === undefined || parking === 'false') {
        parking = { $in: [false, true] };
      }
  
      let type = req.query.type;
  
      if (type === undefined || type === 'all') {
        type = { $in: ['sale', 'rent'] };
      }
  
      const searchTerm = req.query.searchTerm || '';
      const address = req.query.address || '';

  
      const sort = req.query.sort || 'createdAt';
  
      const order = req.query.order === 'asc' ? 1 : -1;
  
      const listings = await Listing.find({ //finding listing which satisfy these condition  
        $or: [
          { name: { $regex: searchTerm, $options: 'i' } },
          { address: { $regex: address, $options: 'i' } }
        ],
        offer,
        furnished,
        parking,
        type,
      })
        .sort({ [sort]: order })
        .limit(limit)
        .skip(startIndex);
  
      return res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  };